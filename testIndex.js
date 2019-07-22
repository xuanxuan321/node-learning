
const fs = require('fs');
fs.stat('/Users/shaojianheng/node-learning/COMMIT_EDITMSG', function (err, stat) {
  console.log(stat);
})