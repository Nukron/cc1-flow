const express = require("express");
const mongoose = require("mongoose");
const favicon = require('serve-favicon');
const path = require('path');
const fs = require('fs');

const secret_data = fs.readFileSync('secret.json');
let secret = JSON.parse(secret_data);

const port = process.env.PORT || 3220
const dbURI = `mongodb+srv://${secret.login.user}:${secret.login.psw}@${secret.database.url}/Flow?retryWrites=true&w=majority`;

const app = express();
app.listen(port, () => { console.log(`Server started, and listening on port ${port}`); });

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true}) 
    .then(() => console.log('Connection established to', dbURI))
    .catch(err => console.error('Unable to connect to the mongoDB server. Error:', err.message));

app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use('/', require('./server/routes/index'));
app.use('/event', require('./server/routes/events'));