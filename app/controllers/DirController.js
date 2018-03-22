const git = require('../helpers/GitHelper');

class DirController {
  constructor(git) {
    this.git = git;
  }

  async getFileStructure(req, res) {
    const { params: { hash } } = req;
    const fileStructure = await this.git.getDir(hash);
    res.render('pages/fileStructure', {
      title: 'CATALOG TREE',
      fileStructure,
    });
  }
}

const dirController = new DirController(git);

module.exports = dirController;
