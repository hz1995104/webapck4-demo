const loaderUtils = require("loader-utils");

function loader(source) {
  //返回一个路径
  const filename = loaderUtils.interpolateName(this, "[hash].[ext]", {
    content: source,
  });
  this.emitFile(filename, source); //发射文件
  return `module.exports="${filename}"`;
}

loader.raw = true;
module.exports = loader;
