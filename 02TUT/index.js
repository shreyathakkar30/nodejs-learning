const fs =  require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'Files', 'starter.txt'), 'utf-8', (err, data) => {
    if(err) throw err;
    console.log(data);
})

console.log('This will run before the file is read');

fs.writeFile(path.join(__dirname, 'Files', 'reply.txt'), 'Nice to meet you!', (err) => {
    if(err) throw err;
    console.log("Write Operation complete");

    fs.appendFile(path.join(__dirname, 'Files', 'reply.txt'), '\nTesting the new Line is working', (err) => {
    if(err) throw err;
    console.log("Append Operation complete");

    fs.rename(path.join(__dirname, 'Files', 'reply.txt'), path.join(__dirname, 'Files', 'newReply.txt'), (err) => {
    if(err) throw err;
    console.log("Rename Operation complete");
})
})
});

// fs.appendFile(path.join(__dirname, 'Files', 'test.txt'), 'Testing Text', (err) => {
//     if(err) throw err;
//     console.log("Append Operation complete");
// })

//exit on uncaught errors
process.on('uncaughtException', err => {
    console.log(`There was an uncaught error: ${err}`);
    process.exit(1);
})