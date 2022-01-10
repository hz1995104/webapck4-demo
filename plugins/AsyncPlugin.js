
//异步插件
class AsyncPlugin {
    apply(compiler) {
      compiler.hooks.emit.tapAsync("AsyncPlugin", (compliation,cb) => {
        setTimeout(()=>{
            console.log(`文件发射完成！！！`)
            cb()
        },1000) 
      });
    }
  }
  
  module.exports = AsyncPlugin;