/**
 * 同步瀑布钩子，当依次执行注册的函数时，上一个函数的返回值会作为参数传给下一个函数
 *
 */

class MySyncWaterfallHook {
  constructor() {
    this.tasks = [];
  }

  tap(name, task) {
    this.tasks.push(task);
  }

  call(...args) {
    const [first, ...other] = this.tasks;
    const ret = first(...args);
    other.reduce((pre, cur) => cur(pre), ret);
  }
}

module.exports = MySyncWaterfallHook;
