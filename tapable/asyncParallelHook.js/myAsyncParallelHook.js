/**
 * 异步并发钩子
 *
 */

// tapAsync方式注册
class MyAsyncParallelHook {
  constructor(args) {
    this.tasks = [];
  }

  tapAsync(name, task) {
    this.tasks.push(task);
  }

  callAsync(...args) {
    const finalCallback = args.pop();
    let index = 0;
    const done = () => {
      index++;
      if (index === this.tasks.length) {
        finalCallback();
      }
    };
    this.tasks.forEach((task) => {
      task(...args, done);
    });
  }
}

// tapPromise方式注册
class MyAsyncParallelHookB {
  constructor(args) {
    this.tasks = [];
  }

  tapPromise(name, task) {
    this.tasks.push(task);
  }

  promise(...args) {
    const tasks = this.tasks.map((task) => task(...args));
    return Promise.all(tasks);
  }
}

module.exports = {
  MyAsyncParallelHook,
  MyAsyncParallelHookB,
};
