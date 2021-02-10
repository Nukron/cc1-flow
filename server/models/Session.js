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
    if (session){
        return session;
    } else {
        createMainSession();
        const new_session = await this.findOne();
        return new_session;
    }
}

SessionSchema.method("getEvents", async function() {
    if (this.events.length > 0) {
        const events = await Promise.all(this.events.map(e_id => Event.findById(e_id)));
        return events
    } else {
        console.log("No events yet in this session");
        return null;
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