const express = require('express');
const router = express.Router();

const Session = require('../models/Session');
const Event = require('../models/Event');

router.get('/', async (req, res) => {

    try
    {
        res.sendFile("index.html");
    }
    catch (err)
    {
        console.error('ERROR: ', err.message);
        res.render('index', {errors: [{text: 'Couldn\'t load a story, sorry.'}]});
    }
});

router.post('/reset', async (req, res) => {

    try
    {
        resetSession();
        res.sendFile("Session was resetted!");
    }
    catch (err)
    {
        console.error('ERROR: ', err.message);
        res.render('index', {errors: [{text: 'Couldn\'t load a story, sorry.'}]});
    }
});

function resetSession () {
    Session.loadMainSession().then(s => {
        Session.updateOne(s, {events: [], root_event: null}, (err, res) => { if(err) console.log(err); console.log(res) });
    })
}

module.exports = router;