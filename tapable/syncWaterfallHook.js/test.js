const { SyncWaterfallHook } = require("tapable");
const MySyncWaterfallHook = require("./mySyncWaterfallHook");

class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncWaterfallHook(["name"]),
    };
  }

  start() {
    this.hooks.arch.tap("node", function (name) {
      console.log(`node`, name);
      return "node学的不错";
    });

    this.hooks.arch.tap("js", function (data) {
      console.log(`js`, data);
    });
  }

  call() {
    this.hooks.arch.call("react");
  }
}

const Less = new Lesson();

Less.start();
Less.call();
