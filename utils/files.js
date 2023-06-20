const fs = require('fs');
const promisedFs = require('node:fs/promises');
const path = require('path');
const { red: r, bold } = require('chalk');

const pathDB = path.join(__dirname, '..', 'db/data.json');

module.exports = {
  async writeFile(content) {
    try {
      await promisedFs.writeFile(pathDB, JSON.stringify(content));
    } catch (err) {
      console.error(bold(r(err.message)));
      process.exit(1);
    }
  },
  readFile() {
    try {
      const content = fs.readFileSync(pathDB, 'utf-8');

      return JSON.parse(content);
    } catch (err) {
      console.error(bold(r(err.message)));
      process.exit(1);
    }
  },
};
