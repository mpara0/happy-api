// create an express server 
var express = require("express");
var app = express();

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// make it go live
app.listen(3000, () => {
    console.log("Server running on http:localhost:3000");
});

// make words appear on homepage
app.get("/", (req, res) => {res.send("Hello, Express");});

//Happy API
//JSON Object
const happyItems = [{
    id: 1,
    title: "suzie sheep"},
    {
    id: 2,
    title: "cat"
    }, {
    id: 3,
    title: "puzzle",
}];

//CRUD
// Read - GET
app.get('/happiness', function(req, res) {
    res.send(happyItems);
});

app.get('/happiness/:id', function(req, res) {
    const happy = happyItems.find(g => g.id === parseInt(req.params.id));
    if (!happy) {
        res.status(404).send("Entry can't be found sad");
    }
    res.send(happy);
});

// Create - POST
app.post('/happiness', function(req, res) {
    const happy = {
        id: happyItems.length + 1,
        title: req.body.title
      }
    happyItems.push(happy);
    res.send(happy);
});

// Delete - DELETE
app.delete('/happiness/:id', function(req, res) {
    const happy = happyItems.find(g => g.id == parseInt(req.params.id));
    if (!happy) {
        res.status(400).send("The value is gone");
    }
    const index = happyItems.indexOf(happy);
    happyItems.splice(index,1);
    res.send(happy);
});

// Update - PUT