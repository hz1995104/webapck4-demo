const { AsyncSeriesHook } = require("tapable");
const { MyAsyncSeriesHookB } = require("./myAsyncSeriesHook");

class Lesson {
  constructor() {
    this.hooks = {
      arch: new MyAsyncSeriesHookB(["name"]),
    };
  }

  start() {
    this.hooks.arch.tapPromise("node", (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(`node`, name);
          resolve();
        }, 2000);
      });
    });

    this.hooks.arch.tapPromise("js", (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(`js`, name);
          resolve();
        }, 2000);
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
