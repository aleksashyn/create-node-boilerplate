const path = require('path');
const copy = require('recursive-copy');
const through = require('through2');

let projectInfo;

function replacePlaceholder(content) {
  return content
    .replace(/PROJECT_NAME/g, projectInfo.name)
    .replace(/PROJECT_DESCRIPTION/g, projectInfo.description)
    .replace(/PROJECT_AUTHOR_NAME/g, projectInfo.author.name)
    .replace(/PROJECT_AUTHOR_EMAIL/g, projectInfo.author.email);
}

function transformFile(src, dest, stats) {
  if (!stats.isFile() && stats.isDirectory()) {
    return null;
  }
  return through((chunk, enc, done) => done(null, replacePlaceholder(chunk.toString())));
}

function copyTemplateDir(destPath, project) {
  projectInfo = project;
  const templateDir = path.resolve(__dirname, '../template');
  const options = {
    dot: true,
    transform: transformFile
  };
  global.console.log(`Start copy template files to Project dir [${destPath}]`);
  return copy(templateDir, destPath, options);
}

module.exports = copyTemplateDir;
