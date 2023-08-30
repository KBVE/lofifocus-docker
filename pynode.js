const { spawnSync } = require("child_process");
const { readFile } = require("fs/promises");
const { appendFile } = require("fs/promises");
const { join } = require("path");

class pyNode {
  constructor(____file, ____json) {
    this.loading = false;
    this.file = ____file;
    this.json = ____json;
    this.error;
    this.result;
    this.process;
    this._data;
    this.data;
  }

  async _kbveInit() {
    this.loading = true;
    //console.log(await spawnSync("pip", ['freeze']));
    this.process = await spawnSync("python3", [`${__dirname}/scripts/${this.file}.py`, this.json]);
    this.error = this.process.stderr?.toString()?.trim();
    this.result = this.process.stdout?.toString()?.trim();

    const status = this.process.status;

    if (status === 0) {
      this._data = this.result;
    } else {
      this._data = this.error;

    }

    this.loading = false;
    }

  async initialize() {
    if (!this.initializationPromise) {
      this.initializationPromise = this._kbveInit();
    }
    return this.initializationPromise;
  }

  async _process() {
    try {
      const responseObject = {
        data: this._data,
      };
      this.data = responseObject;
    } catch (error) {

    }
    return this.data;
  }

}

async function pyNodeManager(_file, _json) {
  const _pyNode = new pyNode(_file, _json);
  await _pyNode.initialize();
  return _pyNode;
}

module.exports = { pyNodeManager };
