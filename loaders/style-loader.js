
//简单style-loader实现
function loader(source) {
  //导出一个脚本字符串,JSON.stringify(source)将源码转换为一行的字符串，使其能够被执行
  let str = `
        let style=document.createElement('style');
        style.innerHTML=${JSON.stringify(source)};  
        document.head.appendChild(style);
    `;
  return str;
}

module.exports = loader;
