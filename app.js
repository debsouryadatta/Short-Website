// L73-->It is only 12 min tut, the rest part is just styling and in that 12min also,same as L72 content is taught.
// L74-->Here we have seen how user posts req and that information we can store in a txtfile

// IMP Point--> If we use express,then we should use pug or else it will show error(And we know we require express for posting process,so pug is must)
// IMP Point--> To make the photos visible on website,we must keep the photos on the static folder & the css file also.

const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const bodyparser=require("body-parser")
const port = 80;

// Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    email: String,
    phone: String,
    password: String,
  });
// Define Model
  const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())  // use in posting by the user.

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    res.status(200).render('index.pug');
})

app.post('/', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
})
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
