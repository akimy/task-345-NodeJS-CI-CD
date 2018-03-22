const git = require('../helpers/GitHelper');

class DirController {
  constructor(git) {
    this.git = git;
  }

  async getFileStructure(req, res) {
    const { params: { hash } } = req;
    try {
      const fileStructure = await this.git.getDir(hash);
      res.render('pages/fileStructure', {
        title: 'CATALOG TREE',
        fileStructure,
      });
    } catch (error) {
      res.render('error', {
        message: 'Ошибка во время получения коммитов',
        error,
      });
    }
  }
}

const dirController = new DirController(git);

module.exports = dirController;
