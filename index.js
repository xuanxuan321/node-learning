const fs = require('fs');
const stdin = process.stdin;
const stdout = process.stdout;
function getDir(path) {
  const stats = [];
  fs.readdir(path, (err,files) => {
    console.log('');
    if (!files.length) {
      return console.log('  \033[31m No files to show \033[39m ')
    }
    console.log(' Select which file or directory you want to see\n');
    
    function file(i) {
      var filename = files[i];
      // console.log(path + '/' + filename,444);
      fs.stat(path + '/' + filename, function (err, stat) {
        stats[i] = stat;
        if (stat.isDirectory()) {
          console.log('   '+i+'    \033[36m'+filename+'/\033[39m');
        } else {
          console.log('   '+i+'    \033[90m'+filename+'\033[39m');
        }
        i++;
        if (i == files.length) {
          read();
        } else {
          file(i)
        }
      })
    }
    function read() {
      console.log('');
      stdout.write(' \033[33mEnter your choice: \033[39m');
      stdin.resume();
      stdin.setEncoding('utf8');
      stdin.on('data', option);
    }
    function option(data) {
      var filename = files[Number(data)];
      console.log(Number(data),filename,5555)

      if (!files[Number(data)]) {
        stdout.write(' \033[31mEnter your chioce: \033[39m')
      } else {
        stdin.pause();
        if (stats[Number(data)].isDirectory()) {
          console.log(path + '/' + filename, 222);
          getDir(path + '/' + filename);
        } else { 
          console.log(path + '/' + filename,333);
          fs.readFile(path + '/' + filename, 'utf8', function (err, data) {
            console.log('');0
            console.log('\033[90m'+data.replace(/(.*)/g, ' $1')+'\033[39m'); 
          })
        }
      }
    }
    file(0);
  })
  
}
getDir(process.cwd())



//为什么后续输入的值都会被第一次的stdin.resume 读取