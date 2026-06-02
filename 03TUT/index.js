//Before doing anythhing run this command in the Bash
//npm i nodemon -g
//console.log("Hello World!!");
//Run npm init -y to create a package.json file
//Run npm i date -fns to install the date-fns package
//to install nodemon dependency run npm i nodemon -D command
const { format } = require('date-fns');
const { v4: uuid} = require('uuid');

console.log(format(new Date(), 'yyyy-MM-dd \t HH:mm:ss'));

//console.log("Hello World!!");
console.log(uuid());//This will log a different ID or generate a new ID everytime you run the code

//Now install uuid package to generate unique ids for our users and posts
