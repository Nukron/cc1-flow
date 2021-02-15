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
    }
});

router.get('/session', async (req, res) => {

    try
    {
        const session = await Session.loadMainSession();
        res.send(session);

    }
    catch (err)
    {
        console.error('ERROR: ', err.message);
    }
});

router.post('/reset', async (req, res) => {

    try
    {
        resetSession();
        res.send("Session was resetted!");
    }
    catch (err)
    {
        console.error('ERROR: ', err.message);
    }
});

function resetSession () {
    Session.loadMainSession().then(s => {
        Session.updateOne(s, {events: [], root_event: null}, (err, res) => { if(err) console.log(err); console.log(res) });
    })
}

module.exports = router;