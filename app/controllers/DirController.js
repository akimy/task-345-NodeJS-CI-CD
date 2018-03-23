const git = require('../helpers/GitHelper');

class DirController {
  constructor(git) {
    this.git = git;
  }

  lexicalSort(arr) {
    return arr.sort();
  }

  async getFileStructure(req, res) {
    const { params: { hash } } = req;
    try {
      const fileStructure = await this.git.getDir(hash);
      const dirs = this.lexicalSort(fileStructure.filter(el => el.type === 'tree'));
      const files = this.lexicalSort(fileStructure.filter(el => el.type !== 'tree'));
      res.render('pages/fileStructure', {
        title: 'CATALOG TREE',
        dirs,
        files,
      });
    } catch (error) {
      res.render('error', {
        message: 'An error occurred while getting the file structure',
        error,
      });
    }
  }
}

const dirController = new DirController(git);

module.exports = dirController;
