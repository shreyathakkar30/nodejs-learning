const fs = require('fs');


//now lets use existsSync Method to check if the directory exists or not and if it does not exist then we will create it
if(!fs.existsSync('./new')) {
fs.mkdir('./new', (err) => {
    if(err) throw err;
    console.log("Directory created successfully");
});
}

if(!fs.existsSync('./new')) {
fs.rmdir('./new', (err) => {
    if(err) throw err;
    console.log("Directory removed successfully");
});
}