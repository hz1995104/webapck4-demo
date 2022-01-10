/**
 * 异步串型钩子
 *
 */

//tapAsync方式注册
class MyAsyncSeriesHook {
  constructor(args) {
    this.tasks = [];
  }

  tapAsync(name, task) {
    this.tasks.push(task);
  }

  callAsync(...args) {
    let finalCallback = args.pop();
    let index = 0;
    let next = () => {
      if (this.tasks.length === index) return finalCallback();
      let task = this.tasks[index++];
      task(...args, next);
    };
    next();
  }
}

//tapPromise方式注册
class MyAsyncSeriesHookB {
  constructor(args) {
    this.tasks = [];
  }

  tapPromise(name, task) {
    this.tasks.push(task);
  }

  promise(...args) {
    const [first, ...others] = this.tasks;
    return others.reduce((pre, cur) => {
      return pre.then(() => cur(...args));
    }, first(...args));
  }
}

module.exports = {
  MyAsyncSeriesHook,
  MyAsyncSeriesHookB,
};
