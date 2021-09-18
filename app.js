const http = require('http');

const routes = require('./routes');

//OPTION 1
// const server = http.createServer(routes);

//OPTION 2
console.log(routes.someText);
const server = http.createServer(routes.handler);


server.listen(3000);