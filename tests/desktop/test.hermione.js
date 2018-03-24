const { assert } = require('chai');

describe('Заголовок страницы', () => {
  it('Должен быть Branches', function getTitle() {
    return this.browser
      .url('/')
      .getText('h1')
      .then((title) => {
        assert.equal(title, 'BRANCHES');
      });
  });
});
