//Now if we have large files sometimes it is not good to grab all of the data at once
//It could be too much just like moving all the water in the swimming pool at once, we can use streams to move the data in smaller chunks
//Streams are also used for real time data like video streaming, audio streaming, etc
const fs = require('fs');

const rs = fs.createReadStream('./Files/lorem.txt', { encoding: 'utf-8' });

const ws = fs.createWriteStream('./Files/New-Lorem.txt');


/*rs.on('data', (dataChunk) => {
    ws.write(dataChunk);
});*/

rs.pipe(ws); //This is a more efficient way to write the data to the new file, it will automatically handle the backpressure and it will also handle the end of the stream  
