'use strict'

const ws = require('ws');
const wss = new ws.Server({ port: 8080 }, () => {
  console.log('服务器启动');
});

wss.on('headers', (params, req) => {
  // console.log('headers:', params);
  // console.log('req:', req);
});

wss.on('error', (params) => {
  console.log('服务器 error:', params);
});

wss.on('listening', (params) => {
  console.log('服务器开始接受 Socket');
});

// socket
wss.on('connection', (ws, req) => {
  console.log('有 Socket 来了');
  console.log('ip:', req.headers.host);
  console.log('url:', req.url);

  ws.on('message', (message) => {
    console.log('wsMessage:', message);
    //广播
    broadcast(message);
  });

  ws.on('error', (params) => {
    console.log('wsError:', params);
  });

  ws.on('open', (params) => {
    console.log('wsOpen:', params);
  });

  ws.on('close', (params) => {
    console.log('wsClose:', params);
  });

  ws.on('headers', (params) => {
    console.log('wsHeaders:', params);
  });

  ws.on('ping', (params) => {
    console.log('wsPing:', params);
  });

  ws.on('pong', (params) => {
    console.log('wsPong:', params);
  });

  //发送消息
  ws.send('连接成功', (error) => {
    if (error) console.log('发送 error:', error);
  });
});

// 广播
function broadcast(message) {
  wss.clients.forEach((ws) => {
    if (ws.readyState === ws.OPEN) {
      if (message) {
        ws.send('用户:' + message);
      } else {
        // ws.send('主动广播:' + wss.clients.size);
        ws.send(new Date());        
      }
    }
  });
};

setInterval(broadcast, 5);

//终结
//ws.terminate();

