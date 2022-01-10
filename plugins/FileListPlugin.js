//输出一个文件列表的文件

class FileListPlugin {
  constructor({ filename }) {
    this.filename = filename;
  }
  apply(compiler) {
    compiler.hooks.emit.tap("FileListPlugin", (compliation) => {
      let assets = compliation.assets;
      let content = `## 文件名    资源大小\r\n`;
      Object.entries(assets).forEach(([filename, statObj]) => {
        content += `- ${filename}    ${statObj.size()}\r\n`;
      });
      //资源对象
      assets[this.filename] = {
        source() {
          return content;
        },
        size() {
          return content.length;
        },
      };
    });
  }
}

module.exports = FileListPlugin;
