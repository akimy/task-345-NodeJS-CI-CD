const { expect } = require('chai');
const git = require('./stabs/gitHelperStub');
const ResponseMock = require('./mocks/ResponseMock');
const branchController = require('../app/controllers/BranchController');

branchController.git = git;

describe('Branch Controller', () => {
  it('Получает валидные данные в функцию res.render', async () => {
    const req = {};
    const res = new ResponseMock();
    const expected = {
      title: 'BRANCHES',
      branches:
       [{
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
       }],
      graph: 'some graph data',
    };

    await branchController.getBranchesList(req, res);
    const result = res.getData();

    expect(result).to.deep.equal(expected);
  });

  it('Рендерит View pages/branches', async () => {
    const req = {};
    const res = new ResponseMock();
    const expected = 'pages/branches';

    await branchController.getBranchesList(req, res);
    const result = res.getView();

    expect(result).to.equal(expected);
  });
});
