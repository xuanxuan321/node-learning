const connect = require('connect');
const serveStatic = require('serve-static')
const app = connect();

app.use((req, res,next) => {
  console.log(req.method, req.url);
  next();
})
app.use(
  serveStatic(__dirname + '/website')
);

app.listen(3000);