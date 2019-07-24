module.exports = function (opts) {
  let time = opts || 100;
  return function (req,res,next) {
    let timer = setTimeout(() => {
      console.log('%s %s is take too long',req.method,req.url);
    }, time)
    let end = res.end;
    res.end = function (chunk, encoding) {
      res.end = end;
      res.end(chunk, encoding);
      clearTimeout(timer)
    };
    next();
  }
}