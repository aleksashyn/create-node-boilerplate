const path = require('path');
const lodash = require('lodash');

const gitConfig = require('./git');
const copyTemplate = require('./templateGenerator');

const destPath = path.resolve(
  __dirname,
  '..',
  path.parse(process.argv[0]).name === 'node' ? process.argv[2] : process.argv[1]
);

const project = {
  name: '',
  description: '',
  author: {
    name: '',
    email: ''
  }
};

function generate() {
  project.name = lodash.last(destPath.split(path.sep));

  const gitUser = gitConfig();
  project.author.name = gitUser.name;
  project.author.email = gitUser.email;
  copyTemplate(destPath, project)
    .then(() => global.console.log(`Project [${project.name}] generate successfully`))
    .catch(err => global.console.log(`Cannot generate Project [${project.name}]. Reason: ${err}`));
}

generate();
