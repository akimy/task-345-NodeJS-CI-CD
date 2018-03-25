const git = require('../helpers/GitHelper');

/**
 * @class FilesController - контроллер отвечающий за работу с сущностью файл
*/
class FilesController {
  /**
   * Устанавливает в локальную область видимости инстанс GitHelper
   * @param {GitHelper} git
  */
  constructor(git) {
    this.git = git;
  }

  /**
   * Рендерит страницу с содержимым файла
   */
  async openFile(req, res) {
    const { params: { hash } } = req;
    try {
      const fileData = await this.git.getFileData(hash);
      res.render('pages/fileData', {
        title: 'ДАННЫЕ ФАЙЛА',
        fileData,
      });
    } catch (error) {
      res.render('error', {
        message: 'Ошибка во время открытия файла',
        error,
      });
    }
  }
}

const filesController = new FilesController(git);

module.exports = filesController;
