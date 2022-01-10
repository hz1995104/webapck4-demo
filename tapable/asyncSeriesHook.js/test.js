const { AsyncSeriesHook } = require("tapable");
const {MyAsyncSeriesHook} = require("./myAsyncSeriesHook");
const A =require('../index')

class Lesson {
  constructor() {
    this.hooks = {
      arch: new A(["name"]),
    };
  }

  start() {
    this.hooks.arch.tapAsync("node", (name, cb) => {
      setTimeout(() => {
        console.log(`node`, name);
        cb();
      }, 2000);
    });

    this.hooks.arch.tapAsync("js", (name, cb) => {
      setTimeout(() => {
        console.log(`js`, name);
        cb();
      }, 2000);
    });
  }

  call() {
    this.hooks.arch.callAsync("react", () => {
      console.log("end");
    });
  }
}

const Less = new Lesson();

Less.start();
Less.call();
