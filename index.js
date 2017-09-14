const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws, req) => {
	console.log('----------------',	req.connection.remoteAddress);
	//接收消息
	ws.on('message', (message , req) => {
		console.log('received: %s', message);
	});
	ws.on('error', (params) => {
		console.log('----------------');
	});

	ws.on('open',  (params) => {
		console.log('----------------');
	});

	ws.on('close', (params) => {
		console.log('-----------');
	});

	//发送消息
	ws.send('连接成功');
});

// 广播
function broadcast() {
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send('主动广播');
		}
	});
};
setInterval(broadcast, 5 * 1000);

