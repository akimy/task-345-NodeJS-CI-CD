const git = require('../helpers/GitHelper');

class FilesController {
  constructor(git) {
    this.git = git;
  }

  async openFile(req, res) {
    const { params: { hash } } = req;
    try {
      const fileData = await this.git.getFileData(hash);
      res.render('pages/fileData', {
        title: 'FILE DATA',
        fileData,
      });
    } catch (error) {
      res.render('error', {
        message: 'Ошибка во время открытия файла',
        error,
      });
    }
  }
}

const filesController = new FilesController(git);

module.exports = filesController;
