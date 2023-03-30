#!/usr/bin nodejs
const http = require('node:http');
const fs   = require('node:fs');
const express = require ('express');
const app    = express();
const url     = require('url');

app.set('view engine', 'ejs');
app.use(express.static("./public"));
app.get('/', (req, res) =>{
    res.render('index')
});
app.get('/home', (req, res) =>{
res.render('index')
});
app.get('/adaptations-AM', (req, res) =>{
res.render('adaptations-and-parodies')
});
app.get('/plot-AM', (req, res) =>{
    res.render('angry-men-home')
});
app.get('/awards-AM', (req, res) =>{
    res.render('awards')
});
app.get('/cast-AM', (req, res) =>{
res.render('cast-members')
});
app.get('/contact', (req, res) =>{
res.render('contact')
});
app.get('/reviews-AM', (req, res) =>{
    res.render('reviews')
});
app.get('/transcripts-AM', (req, res) =>{
    res.render('transcripts')
});
app.get('/info', (req, res) => {
    const id = req.query.id;
    console.log(id);
    res.render('info', {ejsid: id});
});
app.all("*", (req,res) => {
    res.status(404).send("resource not found ... ");
});
app.listen(PORT=5001, (req, res) => {
    console.log(`server is running on port ${PORT}...`);
});

