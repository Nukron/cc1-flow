const express = require('express');
const router = express.Router();

const Event = require('../models/Event');
const Session = require('../models/Session');

router.get('/', async (req, res) => {
    try {
       const session = await Session.loadMainSession();
       const events = await Session.getEvents(session);
       res.send("Test!");
    }

    catch {

    
    }
})

router.post('/add', async (req, res) => {
    try {
       newEvent();
    }

    catch {
        console.log("Could not create new event");
    }
});

router.delete('/:eventId', async (req, res) => {
    try {
        //TODO: Implement remove event
    }

    catch {
        console.log("Could not add event")
    }
});

router.post('/veto/:eventId', async (req, res) => {
    try {
        //TODO: Implement update event, for vetos
    }

    catch  {

    }
})

async function newEvent (event) {
    Session.loadMainSession().then(s => {
        const new_event = Event.createEvent(event);
        new_event.save().then(event => {
            if (s.root_event){
                Session.updateOne(s, {events: s.events.concat([event._id])}, (err, res) => { if(err) console.log(err); console.log(res) })
            } else {
                Session.updateOne(s, {root_event: event._id, events: s.events.concat([event._id])}, (err, res) => { if(err) console.log(err); console.log(res) })
            }
        })
    })
}


module.exports = router;