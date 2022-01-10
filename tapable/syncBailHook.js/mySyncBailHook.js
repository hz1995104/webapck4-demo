/**
 * 同步保险钩子，当上一个注册函数返回不是undefined时，停止下面函数的执行
 *
 */

class MySyncBailHook {
  constructor() {
    this.tasks = [];
  }

  tap(name, task) {
    this.tasks.push(task);
  }

  call(...args) {
    let ret; // 每一个函数返回的值
    let index = 0;
    // 使用do..while确保至少会执行一次
    do {
      ret = this.tasks[index++](...args);
    } while (ret === undefined && index < this.tasks.length);
  }
}

module.exports = MySyncBailHook;
