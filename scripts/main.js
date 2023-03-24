#!/usr/bin nodejs

const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World Test 2.');
    res.end();
}).listen(8015,'localhost');