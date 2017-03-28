import commonStyleJSON from '/imports/consts/common.json';

export default class Styler {
  constructor(pageStyle) {
    if (pageStyle) {
      this.styleJson = Object.assign(commonStyleJSON, pageStyle);
    } else {
      this.styleJson = commonStyleJSON;
    }
  }

  style(...classes) {

    var style = {}
    var result = {}

    if (classes) {
      // merge style
      for (var i = 0, l = classes.length; i < l; i++) {
        if (this.styleJson[classes[i]]) {
          style = Object.assign(style, this.styleJson[classes[i]].style);
        }
      }

      // merge outside properties
      for (var i = 0, l = classes.length; i < l; i++) {
        if (this.styleJson[classes[i]]) {
          result = Object.assign(result, this.styleJson[classes[i]]);
        }
      }

      result.style = style;
    }

    return result;
  }
}
