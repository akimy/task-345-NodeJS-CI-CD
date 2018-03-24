const git = require('../../app/helpers/GitHelper');

const HASH = '#TESTHASH';
const exec = (command) => {
  console.log(command);
  switch (command) {
    case `git log ${HASH} --pretty="%h|%s|%cn|%cd" --date=short`:
      return Promise.resolve({
        stdout: '359a034|nonvalidated|Alexander Vaganov|2018-03-24\n' +
        '895fe48|try another alias|Alexander Vaganov|2018-03-24',
      });
    case 'git branch -v':
      return Promise.resolve({
        stdout: '  master             6250a9b Revert "configure project for migration to React"\n' +
        '* migration_to_react 34942c2 styled-components was added / font loader',
      });
    default:
      return 'ERROR';
  }
};

git.exec = exec;

module.exports = git;
