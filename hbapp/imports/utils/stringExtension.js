// console.log("Hello, ${p0}. This is a ${p1}".format("world", "test"));
String.prototype.format = function () {
  var args = arguments;
  return this.replace(/\$\{p(\d)\}/g, function (match, id) {
    return args[id];
  });
};

/**
 * @description Replace a string with pattern
 * @example `"${v1},${v2}".formatObj({v1:1,v2:2});` this returns "1,2".
 */
String.prototype.formatObj = function (obj) {
  return this.replace(/\$\{\w+\}/g, function (match, id) {
    let fieldName = match.substr(2, match.length-3);
    return obj ? obj[fieldName] : "";
  });
}