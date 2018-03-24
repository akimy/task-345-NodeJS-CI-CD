const express = require('express');
const branchController = require('../app/controllers/BranchController');
const dirController = require('../app/controllers/DirController');
const commitsController = require('../app/controllers/CommitsController');
const filesController = require('../app/controllers/FilesController');

const router = express.Router();

/**
 * Роутинг по приложению. Каждый GET запрос обрабатывается контроллерами в папке
 * /app/controllers/*
 */

router.get('/', (req, res) => {
  branchController.getBranchesList(req, res);
});

router.get('/dir/:hash', (req, res) => {
  dirController.getFileStructure(req, res);
});

router.get('/commits/:hash', (req, res) => {
  commitsController.getCommitsList(req, res);
});

router.get('/files/:hash', (req, res) => {
  filesController.openFile(req, res);
});

module.exports = router;
