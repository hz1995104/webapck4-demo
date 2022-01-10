/**
 * 同步循环钩子，当注册函数执行时返回的不是undefined时，会一直循环执行
 *
 */

class MySyncLoopHook {
  constructor() {
    this.tasks = [];
  }

  tap(name, task) {
    this.tasks.push(task);
  }
 
  call(...args) {
    this.tasks.forEach((task) => {
      let ret;
      do {
        ret = task(...args);
      } while (ret !== undefined);
    });
  }
}

module.exports = MySyncLoopHook;
