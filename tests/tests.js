const { expect } = require('chai');
const git = require('./stabs/gitHelperStub');

describe('GIT HELPER CLASS', () => {
  describe('Проверяем функцию парсинга строк и удаления пустых строк', () => {
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
      const expectedArr = [
        'In the middle of the journey of our life',
        'I came to myself, in a dark wood',
        'where the direct way was lost',
      ];

      const arr = git.splitByReturnCarretAndFilterEmptyRows(rawString);

      expect(arr).to.deep.equal(expectedArr);
    });
  });

  describe('Тест проверяющий деление', () => {
    it('Проверяет что 6 / 3 = 2', () => {
      const a = 6;
      const b = 2;
      const c = a / b;
      expect(c).to.equal(3);
    });
  });
});
