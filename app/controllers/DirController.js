const git = require('../helpers/GitHelper');

class DirController {
  constructor(git) {
    this.git = git;
  }

  async getFileStructure(req, res) {
    const { params: { hash } } = req;
    try {
      let fileStructure = await this.git.getDir(hash);
      fileStructure = fileStructure.sort(file => (file.type === 'tree' ? -1 : 1));
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
