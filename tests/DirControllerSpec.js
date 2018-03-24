const { expect } = require('chai');
const { HASH } = require('./constants');
const git = require('./stabs/gitHelperStub');
const ResponseMock = require('./mocks/ResponseMock');
const dirController = require('../app/controllers/DirController');

dirController.git = git;

describe('Directory Controller', () => {
  it('Получает валидные данные в функцию res.render', async () => {
    const req = {
      params: { hash: HASH },
    };

    const res = new ResponseMock();
    const expected = {
      title: 'CATALOG TREE',
      dirs:
       [{
         type: 'tree',
         hash: 'cd237d6c2c1ed03577c968517bb525b74916ca7a',
         name: 'src',
       }],
      files:
       [{
         type: 'blob',
         hash: '0222efa58d0499f44bc655ddd64a9ffdcd0f1f21',
         name: 'package.json',
       },
       {
         type: 'blob',
         hash: '7157cd35769f9c918a287b8d3d7030bdedf7998b',
         name: 'webpack.config.js',
       }],
    };

    await dirController.getFileStructure(req, res);
    const result = res.getData();

    expect(result).to.deep.equal(expected);
  });

  it('Рендерит View pages/fileStructure', async () => {
    const req = {
      params: { hash: HASH },
    };
    const res = new ResponseMock();
    const expected = 'pages/fileStructure';

    await dirController.getFileStructure(req, res);
    const result = res.getView();

    expect(result).to.equal(expected);
  });
});
