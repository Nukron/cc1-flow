const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Event = require('./Event');

const SessionSchema = new Schema({
    name: String, 
    root_event: String,
    events: Array, 
    players: Array,
    turn:  Number
});

SessionSchema.statics.loadMainSession = async function() {
    const session = await this.findOne();
    if(!session){
        await createMainSession();
        return await this.findOne();
    }
    return session;
}

SessionSchema.method('removeEvent', async function(target_id) {
    await Event.deleteEvent(target_id);
    await this.updateOne({events: this.events.filter(e => e !== target_id)})
});

SessionSchema.method("getEvents", async function() {
    if (this.events.length > 0) {
        const events = await Promise.all(this.events.map(e_id => Event.findById(e_id)));
        return events.filter(e => e !== null)
    } else {
        console.log("No events yet in this session");
        return null;
    }
})

SessionSchema.method("removeEventsDeep", async function(id) {
    try
    {
        const events = await this.getEvents();
        const events_to_delete = collectRelatedEvents(id, events);
        console.log("About to be deleted: ", events_to_delete);
        if (events_to_delete.length > 1){
            for (let target_id of events_to_delete){
                await this.removeEvent(target_id);
            }
        } else {
            await this.removeEvent(id);
        }
    }
    catch (err)
    {
        return console.error(err);
    }
})

const Session = mongoose.model('Session', SessionSchema);

async function createMainSession() {
    const new_session = new Session({
        name: "main",
        root_event: null,
        events: [],
        players: ['anonymous'],
        turn: 0
    });
    new_session.save(function(err) {
        console.log(err)
    });
}

//TODO: Implement more elegant non-recursive solution: check for source-event, if not, remove.

function collectRelatedEvents(id, events) {
  
    const related_events = events.filter(event => event.source_events.some(eid => eid == id)).map(e => e._id);
    const new_ids = [id].concat(related_events);
    if (related_events.length > 0){
        const remaining_events = events.filter(event => !new_ids.some(eid => eid === event._id));
        return related_events.reduce( (a ,e) => a.concat(collectRelatedEvents(e, remaining_events)), new_ids)
    } else {
        return new_ids;
    }
}

module.exports = Session;