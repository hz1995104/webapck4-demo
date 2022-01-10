/**
 * 异步串型瀑布钩子
 *
 */

//tapAsync方式注册
class MyAsyncSeriesWaterfallHook {
  constructor(args) {
    this.tasks = [];
  }

  tapAsync(name, task) {
    this.tasks.push(task);
  }

  callAsync(...args) {
    let finalCallback = args.pop();
    let index = 0;
    let next = (err, data) => {
      let task = this.tasks[index];
      if (!task) return finalCallback();
      if (index === 0) {
        task(...args, next);
      } else {
        task(data, next);
      }
      index++;
    };
    next();
  }
}

module.exports = {
  MyAsyncSeriesWaterfallHook,
};
