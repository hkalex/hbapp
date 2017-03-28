const path = {};

const absoluteUrlRegex = /(http(s)?\:)?\/\//i;

/**
 * @description check if a url is absolute url
 * Absolute URL starts with either "http://", "https://" or "//".
 */
path.isAbsoluteUrl = function(url) {
  return absoluteUrlRegex.test(url);
}

/**
 * @description Combine parts to a path
 */
path.combineUrl = function(...parts) {
  let sep = '/'; 
  let result = [];
  for(let i=0; i<parts.length; i++) {
    let p = parts[i];
    let s = typeof p === 'string' ? p : JSON.stringify(p);
    if (s) {
      result.push(s);
    }
    if (!s.endsWith(sep) && i !== parts.length - 1) {
      result.push(sep);
    }
  }
  return result.join('');
}

export default path;
