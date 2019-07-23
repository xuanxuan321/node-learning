const http = require('http');
const qs = require("querystring");
var search = process.argv.slice(2).join(' ').trim();
if (!search.length) {
  return console.log(`\n Usage: node twitter.js <search term>\n`);
}
console.log(`\n search for: ${search}\n`);
http.get({
  host: 'workordert.weipaitang.com',
  headers: {
    cookie: 'wptTouristUri=M190702204173n7d; wptSessionId=20190702204117_a3wut3neg9; userinfo_cookie=Y52gk7yb1IfDirtby13IDaUEOh1pODTXjfW3tLUxetKpx%2BYdRu7qA%2Fylg%2BT3jvrNNQQ2s8aPy%2BKGgBoh%2FLXGUrIV%2BA0j82IMc2p2CaZq2cqkoUOZ%2FVr%2Bn690qW9kdFmteoD8%2BKLCZFpm8Lk%2BMTvnO68oqf7fR82m%2FjDnqUdgfvDiNqQDqrGLYlukYEFnH2wJzB%2B4ZvqV0grTfH3FTF5qC79nITNKXknv9gIHrE1mqB7MObL%2FSvy5bAsl0C9IrfFb; wpt_env_num=env_01; identity=ae6140773d0bdfe4cd132ed61f90f6e0; work_order_user_info=vAKShe9DKqZ0QreR7kVWdtgqnYElDzWvwac0msNcLzlFQc21zhCCTq5XgqUHnZPammgbKRmfvUowpHyffzB9zaCcZ9vIsSqWRwAR%2BmBwX9ccKILNXkRzjt0j6FdxWREF',
  },
  path:'/api/order/self/detail?'+qs.stringify({uri:search})
}, res => {
    let body = '';
    res.on('data', data => {
      body += data;
    });
    res.on('end', () => {
      let obj = JSON.parse(body);
      console.log(obj);
    })
})