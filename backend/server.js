const login = require('./service/login');
const express = require('express');
const port = process.env.PORT || 8080;

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});



// Start server
const http = require('http');
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server running at port `+port);
});

server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}