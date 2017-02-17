
var open = require('amqplib').connect('amqp://localhost');

var queue = 'message';

open.then((conn) => {
	return conn.createChannel();
}).then((channel) => {
	channel.assertQueue(queue).then(() => {
		return channel.consume(queue, (message) => {
			console.log('[MESSAGE]' + message.content.toString());
			channel.ack(message);
		});
	});
});
