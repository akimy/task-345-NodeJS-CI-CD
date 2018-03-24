const { expect } = require('chai');
const { HASH } = require('./constants');
const git = require('./stabs/gitHelperStub');
const ResponseMock = require('./mocks/ResponseMock');
const filesController = require('../app/controllers/FilesController');

filesController.git = git;

describe('Files Controller', () => {
  it('Получает валидные данные файла в res.render', async () => {
    const req = {
      params: { hash: HASH },
    };

    const res = new ResponseMock();
    const expected = { title: 'FILE DATA', fileData: 'some file data' };

    await filesController.openFile(req, res);
    const result = res.getData();

    expect(result).to.deep.equal(expected);
  });

  it('Рендерит View pages/fileData', async () => {
    const req = {
      params: { hash: HASH },
    };
    const res = new ResponseMock();
    const expected = 'pages/fileData';

    await filesController.openFile(req, res);
    const result = res.getView();

    expect(result).to.equal(expected);
  });
});

