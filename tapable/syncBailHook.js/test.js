const { SyncBailHook } = require("tapable");
const MySyncBailHook = require("./mySyncBailHook");

class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncBailHook(["name"]),
    };
  }

  start() {
    this.hooks.arch.tap("node", function (name) {
      console.log(`node`, name);
      return undefined;
    });

    this.hooks.arch.tap("js", function (name) {
      console.log(`js`, name);
    });
  }

  call() {
    this.hooks.arch.call("react");
  }
}

const Less = new Lesson();

Less.start();
Less.call();
