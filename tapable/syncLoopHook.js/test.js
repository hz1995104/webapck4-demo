const { SyncLoopHook } = require("tapable");
const MySyncLoopHook=require('./mySyncLoopHook')


class Lesson {
  constructor() {
    this.index = 0;
    this.hooks = {
      arch: new SyncLoopHook(["name"]),
    };
  }

  //注册函数
  start() {
    this.hooks.arch.tap("node", (name) => {
      console.log(`node`, name);
      return ++this.index === 3 ? undefined : "继续学";
    });

    this.hooks.arch.tap("js", (name) => {
      console.log(`js`, name);
    });
  }

  //执行函数
  call() {
    this.hooks.arch.call("react");
  }
}

const Less = new Lesson();

Less.start();
Less.call();
