const { SyncHook } = require("tapable");
const MySyncHook = require("./mySyncHook");

class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncHook(["name"]),
    };
  }

  start() {
    this.hooks.arch.tap("node", function (name) {
      console.log(`node`, name);
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
