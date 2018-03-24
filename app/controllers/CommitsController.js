const git = require('../helpers/GitHelper');

/**
 * @class CommitsController - контроллер отвечающий за работу с сущностью коммит
*/
class CommitsController {
  /**
   * Устанавливает в локальную область видимости инстанс GitHelper
   * @param {GitHelper} git
  */
  constructor(git) {
    this.git = git;
  }

  /**
   * Рендерит список коммитов
   */
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
        message: 'An error occurred while getting the commits',
        error,
      });
    }
  }
}

const commitsController = new CommitsController(git);

module.exports = commitsController;
