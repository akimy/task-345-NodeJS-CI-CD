const { exec: execViaCallbacks } = require('child_process');
const exec = require('util').promisify(execViaCallbacks);

/**
 * @class GitHelper - отвечает за работу с CLI GIT, и
 * парсит данные в удобный для вывода вид
*/
class GitHelper {
  /**
   * Устанавливает в локальную область видимости функцию exec
   * @param {Function} exec
  */
  constructor(exec) {
    this.exec = exec;
  }

  /**
   * Метод для разбивки строк по символу перевода строки и очистки от пустых строк
   * @param {String} string
   * @returns {Array} - массив строк
  */
  splitByReturnCarretAndFilterEmptyRows(string) {
    return string.split('\n').filter(string => string !== '');
  }

  /**
   * Преобразует массив строк с информацией о ветви в объект необходимого вида
   * @param {Arr} arr - массив с данными о ветви
   * @returns {Object} - объект с ключами name, hash, message
  */
  getBranchDataFromString(arr) {
    const [name, hash, ...message] = arr;

    return {
      name,
      hash,
      message: message.join(' '),
    };
  }

  /**
   * Преобразует stdout GIT CLI для 'git-branch -v' в массив данных готовых для обработки
   * @param {string} data - строка с stdout GIT CLI
   * @returns {Array} - массив объектов с ключами current, name, hash, message
  */
  parseBranches(data) {
    const rows = this.splitByReturnCarretAndFilterEmptyRows(data);

    return rows.map((row) => {
      const words = row.split(/\s+/g).filter(e => e !== '');
      const [marker, ...other] = words;
      if (marker === '*') {
        return Object.assign({ current: true }, this.getBranchDataFromString(other));
      }

      return Object.assign({ current: false }, this.getBranchDataFromString(words));
    });
  }

  /**
   * Преобразует stdout GIT CLI для 'git log' в массив данных готовых для обработки контроллером
   * @param {string} data - строка с stdout GIT CLI
   * @returns {Array} - массив объектов с ключами hash, message, author и date
  */
  parseCommits(data) {
    const rows = this.splitByReturnCarretAndFilterEmptyRows(data);

    return rows.map((row) => {
      const words = row.split('|');
      return {
        hash: words[0],
        message: words[1],
        author: words[2],
        date: words[3],
      };
    });
  }

  /**
   * Преобразует stdout GIT CLI для 'git ls-tree' в массив данных готовых для обработки контроллером
   * @param {string} data - строка с stdout GIT CLI
   * @returns {Array} - массив объектов с ключами hash, type, name
  */
  parseDir(data) {
    const rows = this.splitByReturnCarretAndFilterEmptyRows(data);

    const objects = rows.map((row) => {
      const [, type, hashAndName] = row.split(' ');
      const [hash, name] = hashAndName.split('\t');
      return { type, hash, name };
    });

    return objects;
  }

  /**
   * Публичный метод для получения коммитов
   * @param {String} hash - хеш указателя (ветви)
   * @returns {Promise} - данные для контроллера
  */
  getCommits(hash) {
    return new Promise((resolve, reject) => {
      this.exec(`git log ${hash} --pretty="%h|%s|%cn|%cd" --date=short`, {
        cwd: './repository',
      })
        .then((res) => {
          resolve(this.parseCommits(res.stdout));
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Публичный метод для получения списка ветвей
   * @returns {Promise} - данные для контроллера
  */
  getBranches() {
    return new Promise((resolve, reject) => {
      this.exec('git branch -v', {
        cwd: './repository',
      })
        .then((res) => {
          this.branches = this.parseBranches(res.stdout);
          resolve(this.branches);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Публичный метод для получения файловой структуры (дерева файлов)
   * @param {String} hash - хеш указателя
   * @returns {Promise} - данные для контроллера
  */
  getDir(hash) {
    return new Promise((resolve, reject) => {
      this.exec(`git ls-tree --full-name ${hash}`, {
        cwd: './repository',
      })
        .then((res) => {
          const dir = this.parseDir(res.stdout);
          resolve(dir);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Публичный метод для получения графа репозитория
   * @returns {Promise} - данные для контроллера
  */
  getGraph() {
    return new Promise((resolve, reject) => {
      this.exec('git log --graph --oneline --all', {
        cwd: './repository',
      })
        .then((res) => {
          resolve(res.stdout);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Публичный метод для получения содержимого файла
   * @param {String} hash - хеш указателя
   * @returns {Promise} - данные для контроллера
  */
  getFileData(hash) {
    return new Promise((resolve, reject) => {
      this.exec(`git cat-file blob ${hash}`, {
        cwd: './repository',
      })
        .then((res) => {
          resolve(res.stdout);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

const git = new GitHelper(exec);

module.exports = git;
