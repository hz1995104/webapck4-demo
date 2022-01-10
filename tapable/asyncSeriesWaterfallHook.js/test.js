const { AsyncSeriesWaterfallHook } = require("tapable");
const {MyAsyncSeriesWaterfallHook} = require("./myAsyncSeriesWaterfallHook");

class Lesson {
  constructor() {
    this.hooks = {
      arch: new MyAsyncSeriesWaterfallHook(["name"]),
    };
  }

  start() {
    this.hooks.arch.tapAsync("node", (name, cb) => {
      setTimeout(() => {
        console.log(`node`, name);
        cb(null,"cx");    //当第一个参数不为null时，停止执行下面的注册函数
      }, 2000);
    });

    this.hooks.arch.tapAsync("js", (data, cb) => {
      setTimeout(() => {
        console.log(`js`, data);
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
