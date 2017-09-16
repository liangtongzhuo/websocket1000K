'use strict'

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 }, () => {
	console.log('服务器启动');
});

wss.on('connection', (ws, req) => {
	console.log('ip:',	req.connection.remoteAddress);

	ws.on('message', (message ) => {
		console.log('message:', message);
	});
	
	ws.on('error', (params) => {
		console.log('error:',params);
	});

	ws.on('open',  (params) => {
		console.log('open:',params);
	});

	ws.on('close', (params) => {
		console.log('close:',params);
	});

	ws.on('headers', (params) => {
		console.log('headers:', params);
	});

	ws.on('ping', (params) => {
		console.log('ping:', params);
	});

	ws.on('pong', (params) => {
		console.log('pong:', params);
	});

	//发送消息
	ws.send('连接成功',(error) => {
		if (error) console.log('发送 error:', error);
	});
});

wss.on('headers', (params, req) => {
	console.log('headers:', params);
	// console.log('req:', req);
});

wss.on('error', (params) => {
	console.log('服务器 error:', params);
});

wss.on('listening', (params) => {
	console.log('listening:',params);
});


// 广播
function broadcast() {
	wss.clients.forEach((ws) => {
		if (ws.readyState === WebSocket.OPEN) {
      ws.send('主动广播'+wss.clients.size);
		}
	});
};
setInterval(broadcast, 5 * 1000);

//终结
//ws.terminate();

