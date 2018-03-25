const { assert } = require('chai');

describe('На странице с коммитами', () => {
  beforeEach(function Test() {
    return this.browser
      .url('/')
      .click('.branches__commits-link');
  });


  it('Заголовок должен быть COMMITS', function getTitle() {
    return this.browser
      .getText('h1')
      .then((title) => {
        assert.equal(title, 'COMMITS');
      });
  });

  it('Должен быть список с коммитами', function getCommitsList() {
    return this.browser
      .isExisting('.commits')
      .then((exists) => {
        assert.ok(exists, 'Список есть');
      });
  });

  it('Кнопка к ветвям должна возвращать на главную', function checkBackButton() {
    this.browser.click('.navigation-link_main-page');
    this.browser.getUrl().then((url) => {
      assert.equal(url, '/');
    });
  });
});
