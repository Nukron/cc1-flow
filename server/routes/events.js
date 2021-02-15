const express = require('express');
const router = express.Router();

const Event = require('../models/Event');
const Session = require('../models/Session');

router.get('/', async (req, res) => {
    try {
       const session = await Session.loadMainSession();
       const events = await session.getEvents();
       res.send(events);
    }

    catch {

    }
})

router.post('/add', async (req, res) => {
    try {
       console.log(req.body);
       await newEvent(req.body);
       console.log("POST: new Event added!");
       res.send("SERVER: Successfully added new Event!")
    }

    catch {
        console.log("Could not create new event");
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const session = await Session.loadMainSession();
        session.removeEventsDeep(id);
        console.log(`DELETE: Event ${id} deleted!`);
        res.send("SERVER: Successfully removed Event and related events!")
    }

    catch(err) {
        console.log("Could not delete event: ", err.message);
    }
});

router.post('/veto/:id', async (req, res) => {
    try {
        const MAX_VETOS = 3;
        const event_id = req.params.id;
        const event = await Event.findOne({_id: event_id});
        const vetos = event.veto_count + 1;
        if (vetos < MAX_VETOS){
            await Event.updateOne({_id: event_id}, {veto_count: vetos});
        } else {
            const session = await Session.loadMainSession();
            await session.removeEventsDeep(event_id);
        }
        console.log(`POST: Veto added to Event ${event_id}`)
        res.send("SERVER: Veto added successfully")
    }

    catch(err)  {
        console.log("Could not vote against event: ", err);
    }
})

//TODO: Refactor and make it a session method

async function newEvent (event) {
    Session.loadMainSession().then(s => {
        const new_event = Event.createEvent(event);
        new_event.save().then(async event => {
            if (s.root_event){
                await Session.updateOne(s, {events: s.events.concat([event._id])}, (err, res) => { if(err) console.log(err); console.log(res) })
            } else {
                await Session.updateOne(s, {root_event: event._id, events: s.events.concat([event._id])}, (err, res) => { if(err) console.log(err); console.log(res) })
            }
        })
    })
}


module.exports = router;