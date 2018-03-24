const git = require('../helpers/GitHelper');

/**
 * @class BranchController - контроллер отвечающий за работу с сущностями ветвь
*/
class BranchController {
  /**
   * Устанавливает в локальную область видимости инстанс GitHelper
   * @param {GitHelper} git
  */
  constructor(git) {
    this.git = git;
  }

  /**
   * Рендерит страницу с графом и списком ветвей
  */
  getBranchesList(req, res) {
    Promise.all([this.git.getBranches(), this.git.getGraph()])
      .then(([branches, graph]) => {
        res.render('pages/branches', {
          title: 'BRANCHES',
          branches,
          graph,
        });
      })
      .catch((error) => {
        res.render('error', {
          message: 'An error occurred while getting the branches',
          error,
        });
      });
  }
}

const branchController = new BranchController(git);

module.exports = branchController;
