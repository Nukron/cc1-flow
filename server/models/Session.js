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

SessionSchema.statics.removeEvent = async function(target_id) {
    const session = await this.loadMainSession();
    await Event.deleteEvent(target_id);
    await this.updateOne(session, {events: session.events.filter(e => e !== target_id)})
}

SessionSchema.method("getEvents", async function() {
    if (this.events.length > 0) {
        const events = await Promise.all(this.events.map(e_id => Event.findById(e_id)));
        return events.filter(e => e !== null)
    } else {
        console.log("No events yet in this session");
        return null;
    }
})

SessionSchema.method("deleteEventsComplete", async function(id) {
    try
    {
        //TODO: Implement recursive function that deletes related Elements
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

module.exports = Session;