const fs = require('fs');
const lodash = require('lodash');
const iniparser = require('iniparser');

const user = {
  name: '',
  email: ''
};

function getGitConfig() {
  const userHomeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
  const gitConfigFile = `${userHomeDir}/.gitconfig`;

  if (fs.existsSync(gitConfigFile)) {
    global.console.log(`Start parsing .gitconfig in ${userHomeDir}`);
    const gitConfig = iniparser.parseSync(gitConfigFile);

    if (lodash.isObject(gitConfig.user) && lodash.isString(gitConfig.user.name))
      user.name = gitConfig.user.name;

    if (lodash.isObject(gitConfig.user) && lodash.isString(gitConfig.user.email))
      user.email = gitConfig.user.email;
  }
  return user;
}

module.exports = getGitConfig;
