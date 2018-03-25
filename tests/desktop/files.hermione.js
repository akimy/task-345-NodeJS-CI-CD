const { assert } = require('chai');

describe('На странице с файлом', () => {
  beforeEach(function Test() {
    return this.browser
      .url('/')
      .click('.branches__dir-link')
      .click('.dir__item-link_file');
  });


  it('Заголовок должен быть FILE DATA', function getTitle() {
    return this.browser
      .getText('h1')
      .then((title) => {
        assert.equal(title, 'FILE DATA');
      });
  });

  it('Должно быть поле с данными файла', function getBranchesList() {
    return this.browser
      .isExisting('.files__inner')
      .then((exists) => {
        assert.ok(exists, 'Поле с данными есть');
      });
  });

  it('Кнопка к ветвям должна возвращать на главную', function checkMainPageButton() {
    this.browser.click('.navigation-link_main-page')
      .getUrl().then((url) => {
        assert.equal(url, '/');
      });
  });
});
