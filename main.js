#!/usr/bin nodejs
const http = require('node:http');
const fs   = require('node:fs');
const express = require ('express');

const index = fs.readFileSync('html/index.html','utf-8');
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(index);
    res.end();
});


server.listen(5001,'localhost');

