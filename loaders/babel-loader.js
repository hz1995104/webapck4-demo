/**
 * babel-loader实现
 * **/

const babel = require("@babel/core");
const loaderUtils = require("loader-utils");
 
function loader(source) {
  let options = loaderUtils.getOptions(this);
  let cb = this.async(); //处理异步
  babel.transform(
    source,
    {
      ...options,
      sourceMap: false, 
    },
    function (err, result) {
      cb(err, result.code);
    }
  );
}

module.exports = loader;
