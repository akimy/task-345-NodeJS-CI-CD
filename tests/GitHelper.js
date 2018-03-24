const { expect } = require('chai');
const git = require('./stabs/gitHelperStub');
const { HASH } = require('./constants');

/* eslint-disable no-alert, no-tabs */
describe('GIT helper', () => {
  describe('splitByReturnCarretAndFilterEmptyRows', () => {
    it('Парсит несколько строк в массив', () => {
      const rawString = 'In the middle of the journey of our life\n' +
      'I came to myself, in a dark wood\n' +
      'where the direct way was lost';
      const expectedArr = [
        'In the middle of the journey of our life',
        'I came to myself, in a dark wood',
        'where the direct way was lost',
      ];

      const arr = git.splitByReturnCarretAndFilterEmptyRows(rawString);

      expect(arr).to.deep.equal(expectedArr);
    });

    it('Удаляет пустые строки', () => {
      const rawString = 'In the middle of the journey of our life\n' +
      '\n\nI came to myself, in a dark wood\n' +
      'where the direct way was lost\n\n' +
      '';
      const expected = [
        'In the middle of the journey of our life',
        'I came to myself, in a dark wood',
        'where the direct way was lost',
      ];

      const result = git.splitByReturnCarretAndFilterEmptyRows(rawString);

      expect(result).to.deep.equal(expected);
    });
  });

  describe('getBranchDataFromString', () => {
    it('Возвращает объект из пар значений трех элементов, имя, хеш последнего коммита и сообщение', () => {
      const initialArr = ['NAME', '#32123', 'This', 'is', 'message'];
      const expected = {
        name: 'NAME',
        hash: '#32123',
        message: 'This is message',
      };

      const result = git.getBranchDataFromString(initialArr);
      expect(result).to.deep.equal(expected);
    });
  });

  describe('parseBranches', () => {
    it('Возвращает массив объектов из пар значений четырех элементов о текущих ветках + указатель', () => {
      const rowString = '  master             6250a9b Revert "configure project for migration to React"\n' +
      '* migration_to_react 34942c2 styled-components was added / font loader';
      const expected = [
        {
          current: false,
          name: 'master',
          hash: '6250a9b',
          message: 'Revert "configure project for migration to React"',
        },
        {
          current: true,
          name: 'migration_to_react',
          hash: '34942c2',
          message: 'styled-components was added / font loader',
        },
      ];

      const result = git.parseBranches(rowString);
      expect(result).to.deep.equal(expected);
    });

    it('Возвращает булевую - указатель на текущую ветку', () => {
      const rowString = '  master             6250a9b Revert "configure project for migration to React\n' +
        '* migration_to_react 34942c2 styled-components was added / font loader';

      const result = git.parseBranches(rowString);

      const [, { current }] = result;
      expect(current).to.equal(true);
    });
  });

  describe('parseCommits', () => {
    it('Возвращает массив объектов с 4 парами ключ-значение: хеш, сообщение, автор и дата', () => {
      const rowString = '359a034|nonvalidated|Alexander Vaganov|2018-03-24\n' +
        '895fe48|try another alias|Alexander Vaganov|2018-03-24';

      const expected = [{
        hash: '359a034',
        message: 'nonvalidated',
        author: 'Alexander Vaganov',
        date: '2018-03-24',
      },
      {
        hash: '895fe48',
        message: 'try another alias',
        author: 'Alexander Vaganov',
        date: '2018-03-24',
      }];

      const result = git.parseCommits(rowString);

      expect(result).to.deep.equal(expected);
    });

    it('Возвращает валидный формат даты-времени в коммите', () => {
      const rowString = '359a034|nonvalidated|Alexander Vaganov|2018-03-24\n';

      const expected = true;

      const [{ date }] = git.parseCommits(rowString);
      const result = !Number.isNaN(new Date(date).getTime());

      expect(result).to.equal(expected);
    });
  });

  describe('parseDir', () => {
    it('Возвращает массив объектов из пар значений хеш, тип, название для директорий', () => {
      const rowString = '100644 blob 93f13619916123cf5434dab2ffcc8263c7420af1	.dockerignore\n' +
        '100644 blob 6e2e2875bc008c88feeb889d4281f5a7c64dd4bb	.eslintignore';
      const expected = [{
        type: 'blob',
        hash: '93f13619916123cf5434dab2ffcc8263c7420af1',
        name: '.dockerignore',
      },
      {
        type: 'blob',
        hash: '6e2e2875bc008c88feeb889d4281f5a7c64dd4bb',
        name: '.eslintignore',
      }];

      const result = git.parseDir(rowString);

      expect(result).to.deep.equal(expected);
    });
  });

  describe('getCommits', () => {
    it('Получает распарсенные коммиты из stdout git-cli', async () => {
      const hash = HASH;
      const expected = [{
        hash: '359a034',
        message: 'nonvalidated',
        author: 'Alexander Vaganov',
        date: '2018-03-24',
      },
      {
        hash: '895fe48',
        message: 'try another alias',
        author: 'Alexander Vaganov',
        date: '2018-03-24',
      }];

      const result = await git.getCommits(hash);

      expect(result).to.deep.equal(expected);
    });
  });

  describe('getBranches', () => {
    it('Получает распарсенные данные о ветвях из stdout git-cli', async () => {
      const hash = HASH;
      const expected = [{
        current: false,
        name: 'master',
        hash: '6250a9b',
        message: 'Revert "configure project for migration to React"',
      },
      {
        current: true,
        name: 'migration_to_react',
        hash: '34942c2',
        message: 'styled-components was added / font loader',
      }];

      const result = await git.getBranches(hash);

      expect(result).to.deep.equal(expected);
    });
  });

  describe('getDir', () => {
    it('Получает распарсенные данные о директориях из stdout git-cli', async () => {
      const hash = HASH;
      const expected = [{
        type: 'blob',
        hash: '0222efa58d0499f44bc655ddd64a9ffdcd0f1f21',
        name: 'package.json',
      },
      {
        type: 'tree',
        hash: 'cd237d6c2c1ed03577c968517bb525b74916ca7a',
        name: 'src',
      },
      {
        type: 'blob',
        hash: '7157cd35769f9c918a287b8d3d7030bdedf7998b',
        name: 'webpack.config.js',
      }];

      const result = await git.getDir(hash);

      expect(result).to.deep.equal(expected);
    });
  });

  describe('getGraph', () => {
    it('Получает row data из stdout git-cli для построения графа', async () => {
      const expected = 'some graph data';

      const result = await git.getGraph();

      expect(result).to.equal(expected);
    });
  });

  describe('getFileData', () => {
    it('Получает row data из stdout git-cli', async () => {
      const hash = HASH;
      const expected = 'some file data';

      const result = await git.getFileData(hash);

      expect(result).to.equal(expected);
    });
  });
});
