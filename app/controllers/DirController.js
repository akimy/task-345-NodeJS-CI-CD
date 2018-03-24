const git = require('../helpers/GitHelper');

/**
 * @class DirController - контроллер отвечающий за работу с сущностью директория/каталог
*/
class DirController {
  /**
   * Устанавливает в локальную область видимости инстанс GitHelper
   * @param {GitHelper} git
  */
  constructor(git) {
    this.git = git;
  }

  /**
   * Метод осуществляющий сортировку по алфавиту
   * @param {Array} arr - массив строк
   * @returns {Array} arr - возвращает отсортированный массив строк
   */
  lexicalSort(arr) {
    return arr.sort();
  }

  /**
   * Рендерит страницу с файловой структурой (каталоги + файлы)
   */
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
