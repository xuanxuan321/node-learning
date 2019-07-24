const connect = require('connect');
const time = require('./request-time');
const app = connect();
app.use(time({ time: 500 }));
app.use((req, res, next) => {
  if ('/a' === req.url) {
    res.writeHead(200);
    res.end('fast')
  } else {
    next()
  }
})
app.use((req, res, next) => {
  if ('/b' === req.url) {
    setTimeout(() => {
      res.writeHead(200);
      res.end('slow')
    }, 1000)
  } else {
    next()
  }
});
app.listen(3000)