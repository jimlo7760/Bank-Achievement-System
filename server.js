const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const http = require('http');
const { onError, onListening } = require('./utils/errorHandler');

require('dotenv').config();

const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data');

const app = express();
const port = process.env.PORT || 8080;

// Middleware
const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, './frontend/dist')));

// Routes
app.use('/', authRoutes);
app.use('/', dataRoutes);

// Frontend routes
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
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

server.on('error', (error) => onError(error, port));
server.on('listening', () => onListening(server));

module.exports = app;