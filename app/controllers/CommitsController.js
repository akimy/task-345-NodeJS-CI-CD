const git = require('../helpers/GitHelper');

class CommitsController {
  constructor(git) {
    this.git = git;
  }

  async getCommitsList(req, res) {
    const { params: { hash } } = req;
    try {
      const commits = await this.git.getCommits(hash);
      res.render('pages/commitsList', {
        title: 'COMMITS',
        commits,
      });
    } catch (error) {
      res.render('error', {
        message: 'Ошибка во время получения коммитов',
        error,
      });
    }
  }
}

const commitsController = new CommitsController(git);

module.exports = commitsController;
