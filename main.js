const amqp = require("amqplib");
const {socket} = require('./socket');

async function init() {
    const conn = await amqp.connect('amqp://localhost', {heartbeat: 0})
        .then((conn) => {
            return conn;
        })
        .catch((err) => console.log(err));
    const channel = await conn.createChannel().then((ch) => {
        return ch;
    })
        .catch((err) => console.log('RabbitMQ channel creation error ' + err));
  channel.consume('admin_locations', function(msg) {
        try {
            const data = parseMessage(msg);
            console.log(data);
            socket.to('admin').emit('event', data);
        } catch (e) {
            console.log(e);
        }
        channel.ack(msg, true);
    });

}
function parseMessage(msg_bfr) {
    if (!msg_bfr || !msg_bfr.content) {
        return null;
    }
    return JSON.parse(msg_bfr.content.toString());
}
init();
