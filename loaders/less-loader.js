const less = require("less");

//简单less-loader实现
function loader(source) {
  let css;
  less.render(source, function (err, r) {
    css = r.css; //r.css就是less渲染后的css文件
  });
  return css;
}

module.exports = loader;
