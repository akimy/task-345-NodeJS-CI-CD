const { assert } = require('chai');

describe('При заходе в файл в какой-то директории и нажатии кнопки назад', () => {
  it('Должны попадать в ту же директорию', function compareFileName() {
    this.browser
      .url('/')
      .click('.branches__dir-link')
      .getText('.dir__item-link_file').then(oldName =>
        this.browser.click('.dir__item-link_file')
          .click('.navigation-link_back')
          .getText('.dir__item-link_file').then((newName) => {
            assert.equal(oldName, newName);
          }));
  });
});
