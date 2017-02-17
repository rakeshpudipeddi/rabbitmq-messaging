var open = require('amqplib').connect('amqp://localhost');

var readline = require('readline');

var queue = 'message'; 

var localInterface = readline.createInterface({
	input : process.stdin, 
	output : process.stdout
});

var mainFunc = () => {
	localInterface.question('[YOU] ', (message) => {
		console.log('\b  [SENT]');
		open.then((conn) => {
			return conn.createChannel();
		}).then((channel) => {
			return channel.assertQueue(queue).then(() => {
				return channel.sendToQueue(queue, new Buffer(message));
			});
		}).then(() => {
			mainFunc();
		}).catch((err) => {
			console.log(err);
		});
	});
}
mainFunc();