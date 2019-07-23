const http = require('http');
const qs = require("querystring");
function send(theName) {
  http.request({
    host: '127.0.0.1',
    port: 3000,
    url: '/',
    method: 'POST',
  }, res => {
    let body = '';
    res.setEncoding('utf8');
    res.on('data', chunk => {
      body += chunk;
    });
    res.on('end', () => { 
      console.log(`\n ${body}`);
      process.stdout.write('\n your name:');
    })
  }).end(qs.stringify({name:theName}));
}
process.stdout.write('\n your name:');
process.stdin.setEncoding('utf8');
process.stdin.resume();
process.stdin.on('data', function (name) {
  send(name.replace('\n',''))
})