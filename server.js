const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const cookieParser = require('cookie-parser');
const path = require('path');
const dayjs = require('dayjs');
const cors = require('cors');

require('dotenv').config();




const corsoptions = {
    origin: 'http://localhost:8080',
    credentials: true,
    optionsSuccessStatus: 200
}
// Create API
app.use(cors(corsoptions));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, './frontend/dist')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/dist/index.html'));
});
app.get('/employee', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/dist/index.html'));
});
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/dist/index.html'));
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
