
//同步插件
class DonePlugin {
  apply(compiler) {
    // console.log("compiler",compiler);
    compiler.hooks.done.tap("DonePlugin", (stats) => {
      console.log("编译完成！！！");
      console.log('Version')
    });
  }
}

module.exports = DonePlugin;
