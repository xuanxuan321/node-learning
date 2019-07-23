const http = require('http');
const fs = require('fs');
const qs = require("querystring");
http.createServer((req, res) => {
  console.log(req.method);
  res.writeHead(200, { "Content-Type": "text/html" });
  if ('/' === req.url) {
    res.end([
      '<form method="POST" action="/url">',
      '<h1>My Form</h1>',
      '<fieldset>',
      '<label>Personal Infomation</label>',
      '<p>what is your name</p>',
      '<input type="text" name="name">',
      '<p><button>Submit</p></button>',
      '</form>'
    ].join(''))
  } else if('/url'===req.url&&"POST"==req.method) {
    let body = '';
    req.on('data', (data) => {
      body += data;
    })
    req.on('end', () => {
      res.writeHead(200, { "Content-Type": "text/html" });
      // res.end(`<p>Content-Type:${req.headers['content-type']}</p><p>Data:</p><pre>${body}</pre>`)
      // res.end(`you sent a <em>${req.method}</em> request`)
      res.end(`<p> your name is ${qs.parse(body).name}</p>`)
    })
  } else {
    res.writeHead('404');
    res.end('Not Found')
  }
  
  // res.writeHead(200, { "Content-Type": "image/png" });
  // let stream = fs.createReadStream('image/png').pipe(res);
  // stream.on('data', (data) => {
  //   res.write(data)
  // })
  // stream.on('end', () => {
  //   res.end()
  // })
  // res.end('Hello <b>World</b>')
}).listen(3000)