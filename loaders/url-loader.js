const loaderUtils = require("loader-utils");
const mime = require("mime");

function loader(source) {
  let { limit } = loaderUtils.getOptions(this);
  if (limit && limit > source.length) {
    //根据图片文件路径解析获取到文件的类型，然后转换为制指定的base64格式
    return `module.exports="data:${mime.getType(
      this.resourcePath
    )};base64,${source.toString("base64")}"`;
  } else {
    return require("./file-loader").call(this, source);
  }
}

loader.raw = true;
module.exports = loader;
