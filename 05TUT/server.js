const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;


const logEvents = require('./logEvents');
const EventEmitter = require('events');
class MyEmitter extends EventEmitter { };

// Initialize object
const myEmitter = new MyEmitter();


const PORT = process.nextTick.PORT || 3500;

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    let filepath;



    //Build a Path and serve the file
    if (req.url === '/' || req.url === '/index.html') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        filepath = path.join(__dirname, 'views', 'index.html');
        fs.readFile(filepath, 'utf-8', (err, data) => {
            res.end(data);
        });
        break;
    }
});

server.listen(PORT , () => console.log(`Server running on port ${PORT}`));





// Add listener for the log event
// myEmitter.on('log', (msg) => logEvents(msg));

// setTimeout(() => {
//     // Emit an event
//     myEmitter.emit('log', 'Log event emitted!');
// }, 2000);