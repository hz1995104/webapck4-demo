const { AsyncParallelHook } = require("tapable");
const { MyAsyncParallelHookB } = require("./myAsyncParallelHook");


class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncParallelHook(["name"]),
    };
  }

  start() {
    this.hooks.arch.tapPromise("node", (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(`node`, name);
          resolve();
        }, 1000);
      });
    });

    this.hooks.arch.tapPromise("js", (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(`js`, name);
          resolve();
        }, 1000);
      });
    });
  }

  call() {
    this.hooks.arch.promise("react").then(function () {
      console.log("end");
    });
  }
}

const Less = new Lesson();

Less.start();
Less.call();
