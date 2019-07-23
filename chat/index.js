const net = require('net');
let count = 0, users = {};
const server = net.createServer((conn) => {
  let nickName=''
  conn.write( 
    '\n > welcome to  \033[92mnode-chat\033[39m!'
    + '\n > ' + count + ' other people are connet this time.'
    + '\n > please write your name and press enter:'
  );
  count++;
  function broadCast(msg,exceptMyself) {
    for (let i in users) {
      if (!exceptMyself || i !== nickName) {
        users[i].write(msg)
      }
    }
  }
  conn.on('data', function (data) {
    //删除回车符
    data = data.replace('\r\n', '');
    if (!nickName) {
      if (users[data]) {
        conn.write('user already exist,Please enter other name: ')
      } else {
        nickName = data;
        users[nickName] = conn;
        broadCast(`${nickName} join the room\n`)
        // for (let i in users) {
        //   users[i].write(`${nickName} join the room\n`)
        // }
      }
    } else {
      broadCast(`${nickName}:${data}\n`,true)
      // for (let i in users) {
      //   if (i !== nickName) {
      //     users[i].write(`${nickName}:${data}\n`)
      //   } 
      // }
    }
  })
  conn.setEncoding('utf8');
  conn.on('close', function () {
    count--;
    delete users[nickName];
    broadCast(`${nickName} left the chatromm\n`)
  })
 
})
server.listen(3000, () => {
  console.log('\033[90m server listen on:3000 \033[39m');
})
