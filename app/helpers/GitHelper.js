const { exec: execViaCallbacks } = require('child_process');
const exec = require('util').promisify(execViaCallbacks);

class GitHelper {
  constructor(exec) {
    this.exec = exec;
  }

  splitByReturnCarretAndFilterEmptyRows(string) {
    return string.split('\n').filter(string => string !== '');
  }

  getBranchDataFromString(arr) {
    const [
      name,
      hash,
      ...message
    ] = arr;

    return {
      name,
      hash,
      message: message.join(' '),
    };
  }

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

  parseDir(data) {
    const rows = this.splitByReturnCarretAndFilterEmptyRows(data);

    const objects = rows.map((row) => {
      const [, type, hashAndName] = row.split(' ');
      const [hash, name] = hashAndName.split('\t');
      return { type, hash, name };
    });

    return objects;
  }

  getCommits(hash) {
    return new Promise((resolve) => {
      this.exec(`git log ${hash} --pretty="%h|%s|%cn|%cd" --date=short`)
        .then((res) => {
          resolve(this.parseCommits(res.stdout));
        })
        .catch((err) => {
          throw err;
        });
    });
  }

  getBranches() {
    return new Promise((resolve, reject) => {
      this.exec('git branch -v')
        .then((res) => {
          this.branches = this.parseBranches(res.stdout);
          resolve(this.branches);
        }).catch((err) => {
          reject(err);
        });
    });
  }

  getDir(hash) {
    return new Promise((resolve) => {
      this.exec(`git ls-tree --full-name ${hash}`)
        .then((res) => {
          const dir = this.parseDir(res.stdout);
          resolve(dir);
        })
        .catch((err) => {
          throw (err);
        });
    });
  }

  getGraph() {
    return new Promise((resolve) => {
      this.exec('git log --graph --oneline --all')
        .then((res) => {
          resolve(res.stdout);
        })
        .catch((err) => {
          throw (err);
        });
    });
  }

  getFileData(hash) {
    return new Promise((resolve) => {
      this.exec(`git cat-file blob ${hash}`)
        .then((res) => {
          resolve(res.stdout);
        })
        .catch((err) => {
          throw (err);
        });
    });
  }
}

const git = new GitHelper(exec);

module.exports = git;