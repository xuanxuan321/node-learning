const http = require('http'), fs = require('fs');
//服务器起的目录 127.0.1.1就是 /Users/shaojianheng/node-learning/website
const serve = http.createServer((req, res) => {
  // console.log('GET' === req.method,'/website/images' == req.url.substr(0, 15),'.jpeg' === req.url.substr(-5),req.url);
  if ('GET' === req.method && '/images'== req.url.substr(0, 7) && '.jpeg' === req.url.substr(-5)) {
    console.log(__dirname,req.url,111);
    fs.stat(__dirname + req.url, (err, stat) => {
      if (err || !stat.isFile()) {
        res.writeHead(404);
        res.end();
      } else {
        serve(__dirname + req.url, 'application/jpeg');
      }
    })
  } else if ('GET' === req.method && '/' === req.url) {
    serve(__dirname + '/index.html', 'text/html');
  } else {
    res.writeHead(404);
    res.end();
  }
  function serve(path, type) {
    res.writeHead(200, { 'Content-Type': type });
    // fs.createReadStream(path).on('data', data => {
    //   res.write(data);
    // }).on('end', () => {
    //   res.end();
    // }
    fs.createReadStream(path).pipe(res)
  }
})
serve.listen(3000)