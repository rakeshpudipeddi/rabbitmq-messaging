var open = require('amqplib').connect('amqp://localhost');

var readline = require('readline');

var queue = 'message'; 

var localInterface = readline.createInterface({
	input : process.stdin, 
	output : process.stdout
});

localInterface.question('message_to_be_send : ', (message) => {
	console.log('[SENT]' + message);
	open.then((conn) => {
		return conn.createChannel();
	}).then((channel) => {
		return channel.assertQueue(queue).then(() => {
			return channel.sendToQueue(queue, new Buffer(message));
		});
	}).catch((err) => {
		console.log(err);
	});
});


