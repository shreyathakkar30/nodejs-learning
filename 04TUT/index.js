const logEvents = require('./logEvents');

const EventEmitter = require('events');

class myEmitter extends EventEmitter { };

//initialize object
const myEmitter1 = new myEmitter();

//add listener for the log event
myEmitter1.on('log', (msg) => logEvents(msg));

setTimeout(() => {
    myEmitter1.emit('log', 'Log event emitted!');
}, 2000);