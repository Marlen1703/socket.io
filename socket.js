const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
    pingTimeout: 5000,
    pingInterval: 5000,
    cors: {
        origin: '*',
    },
});
module.exports = {
    io,
    socket: any= io.use(async (socket, next) => {
    next();
})
    .on('connection', (socket) => {
        console.log('User Socket Connected');
        socket.join('admin')
        socket.on('emit', async (data) => {
        });

        socket.on('disconnect', async () => {
        });
        socket.on('error', async () => {
        });
    })}
httpServer.listen(8284);
