const git = require('../../app/helpers/GitHelper');

const HASH = '#TESTHASH';

/* eslint-disable no-alert, no-tabs */
const exec = (command) => {
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

    case 'git ls-tree --full-name #TESTHASH':
      return Promise.resolve({
        stdout:
        '100644 blob 0222efa58d0499f44bc655ddd64a9ffdcd0f1f21	package.json\n' +
        '040000 tree cd237d6c2c1ed03577c968517bb525b74916ca7a	src\n' +
        '100644 blob 7157cd35769f9c918a287b8d3d7030bdedf7998b	webpack.config.js\n',
      });
    case `git cat-file blob ${HASH}`:
      return Promise.resolve({
        stdout: 'some file data',
      });
    case 'git log --graph --oneline --all':
      return Promise.resolve({ stdout: 'some graph data' });
    default:
      return Promise.resolve('Command not register');
  }
};

git.exec = exec;

module.exports = git;
