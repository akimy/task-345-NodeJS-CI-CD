const { expect } = require('chai');
const ResponseMock = require('./mocks/ResponseMock');
const commitsController = require('../app/controllers/CommitsController');
const git = require('./stabs/gitHelperStub');
const { HASH } = require('./constants');

commitsController.git = git;

describe('Commits Controller', () => {
  it('Получает валидные данные в функцию res.render', async () => {
    const req = {
      params: { hash: HASH },
    };

    const res = new ResponseMock();
    const expected = {
      title: 'COMMITS',
      commits:
     [{
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
     }],
    };

    await commitsController.getCommitsList(req, res);
    const result = res.getData();

    expect(result).to.deep.equal(expected);
  });

  it('Рендерит View pages/commitsList', async () => {
    const req = {
      params: { hash: HASH },
    };
    const res = new ResponseMock();
    const expected = 'pages/commitsList';

    await commitsController.getCommitsList(req, res);
    const result = res.getView();

    expect(result).to.equal(expected);
  });
});

