const { assert } = require('chai');

describe('Главная страница', () => {
  it('Заголовок должен быть BRANCHES', function getTitle() {
    return this.browser
      .url('/')
      .getText('h1')
      .then((title) => {
        assert.equal(title, 'BRANCHES');
      });
  });

  it('На странице должны быть ветви', function getBranchesList() {
    return this.browser
      .url('/')
      .isExisting('.branches__list')
      .then((exists) => {
        assert.ok(exists, 'Список ветвей появился');
      });
  });

  it('На странице должна быть метка на текущую ветку', function getPointer() {
    return this.browser
      .url('/')
      .isExisting('.branches__pointer')
      .then((exists) => {
        assert.ok(exists, 'Указатель на текущую ветку есть');
      });
  });

  it('На странице должен быть граф', function getPointer() {
    return this.browser
      .url('/')
      .isExisting('.graph')
      .then((exists) => {
        assert.ok(exists, 'Граф есть');
      });
  });
});
