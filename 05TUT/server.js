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

const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromises.readFile(
            filePath, 
           !contentType.includes('image') ?  'utf-8' : ''
        );
        const data = contentType === 'application/json' 
        ? JSON.parse(rawData) : rawData;
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(
            contentType === 'application/json'
                ? JSON.stringify(data)
                : data
        );
    } catch (err) {
        console.log(err);
        response.statusCode = 500;
        response.end();
    }
};
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    const extension = path.extname(req.url);

    let contentType;

    switch (extension) {
        case '.html':
            contentType = 'text/html';
            break;
        case '.css':
            contentType = 'text/css'; 
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;  
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';                

    }   

    let filePath = 
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html') 
            :contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                :contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url);

    // makes the .html ext not required in the browser
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';
    
    
    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        serveFile(filePath, contentType, res);
        //serve the file
       // res.statusCode = 200;
        //res.setHeader('Content-Type', contentType);
        
    } else {
        //404
        //301 redirect
        //console.log(path.parse(filePath));
        // res.statusCode = 404;
        // res.setHeader('Content-Type', 'text/html');
        switch (path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, { 'Location': '/new-page.html' });
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, { 'Location': '/' });
                res.end();
                break;    
            default:
                //serve a 404 response
                //res.statusCode = 404;
                //res.setHeader('Content-Type', 'text/html');    
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
        }
    }
    //let filepath;



    //Build a Path and serve the file
    // if (req.url === '/' || req.url === '/index.html') {
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'text/html');
    //     filepath = path.join(__dirname, 'views', 'index.html');
    //     fs.readFile(filepath, 'utf-8', (err, data) => {
    //         res.end(data);
    //     });
    //     break;
    // }
});

server.listen(PORT , () => console.log(`Server running on port ${PORT}`));





// Add listener for the log event
// myEmitter.on('log', (msg) => logEvents(msg));

// setTimeout(() => {
//     // Emit an event
//     myEmitter.emit('log', 'Log event emitted!');
// }, 2000);