const git = require('../helpers/GitHelper');

class BranchController {
  constructor(git) {
    this.git = git;
  }
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
