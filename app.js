const express = require("express");
const mongoose = require("mongoose");
var favicon = require('serve-favicon');
var path = require('path');

const port = process.env.PORT || 3220
//FIXME: Export Data to an external json file.
const dbURI = "mongodb+srv://seb:2kdstcwct6qp9PnZ@milkyway0192e32.goedm.mongodb.net/Flow?retryWrites=true&w=majority";

const app = express();
app.listen(port, () => { console.log(`Server started, and listening on port ${port}`); });

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true}) 
    .then(() => console.log('Connection established to', dbURI))
    .catch(err => console.error('Unable to connect to the mongoDB server. Error:', err.message));

app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use('/', require('./server/routes/index'));
app.use('/event', require('./server/routes/events'));