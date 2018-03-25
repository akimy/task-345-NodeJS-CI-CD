const { assert } = require('chai');

describe('На странице с директорией с первым уровнем вложенности', () => {
  beforeEach(function Test() {
    return this.browser
      .url('/')
      .click('.branches__dir-link');
  });


  it('Заголовок должен быть CATALOG TREE', function getTitle() {
    return this.browser
      .getText('h1')
      .then((title) => {
        assert.equal(title, 'CATALOG TREE');
      });
  });

  it('Должны быть другие файлы и каталоги', function getDirList() {
    return this.browser
      .isExisting('.dir')
      .then((exists) => {
        assert.ok(exists, 'Поля есть');
      });
  });

  it('Кнопка к ветвям должна возвращать на главную', function checkMainPageButton() {
    this.browser.click('.navigation-link_main-page');
    this.browser.getUrl().then((url) => {
      assert.equal(url, '/');
    });
  });
});
