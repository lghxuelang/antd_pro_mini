/**
 * csv文件的操作类
 * @author liugh
 */
export default class Csv {
  /**
   * 导出csv文件
   * @param {*} colTitle  列名(注意对应好列)
   * @param {*} csvdata  导出的数据数组
   * @param {*} filename 文件名称（可选）
   */
  static exportCsv(colTitle, csvdata, filename) {
    const title = colTitle;
    const titleForKey = Object.keys(csvdata[0]);
    const data = csvdata;
    const str = [];
    str.push(title.join(",") + "\n");
    for (var i = 0; i < data.length; i++) {
      var temp = [];
      for (var j = 0; j < titleForKey.length; j++) {
        temp.push(data[i][titleForKey[j]]);
      }
      str.push(temp.join(",") + "\n");
    }
    // ‘\uFEFF’可让bom识别编码格式
    const blob = new Blob(["\uFEFF" + str.join("")], {
      type: "text/plain;charset=utf-8"
    });
    const downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = filename ? filename + ".csv" : "export.csv";
    downloadLink.click();
    downloadLink.remove();
  }
  /**
   * 解析csv文件，返回数据数组
   * @param {*} file  csv文件
   * @param {*} colkey 对象列字段
   * @param {*} callback 回调函数,返回读取的数据
   */
  static readCsv(file, colkey, callback) {
    const reader = new FileReader();
    let content = "";
    reader.onload = event => {
      content = event.target.result;
      const list = content.split("\n");
      const data = list.map((l, index) => {
        const row = l.split(",");
        return colkey.map((col, i) => {
          const obj = {};
          obj[col] = row[i];
          return obj;
        });
      });
      if (callback) callback(data.filter(Boolean));
    };
    reader.readAsText(file, { encoding: "utf-8" });
  }
}
