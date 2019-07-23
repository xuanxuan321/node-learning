const http = require('http');
const qs=require('querystring')
http.createServer((req, res) => { 
  let body = '';
  req.on('data', (data) => {
    body += data;
  })
  req.on('end', () => {
    res.writeHead(200);
    res.end(`Request Complete`)
    console.log(`\n got name ${qs.parse(body).name} \n`)
  })
}).listen(3000)