const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    id: String,
    name: String, 
    root_event: String,
    events: Array, 
    players: Array,
    turn:  Number
});

SessionSchema.statics.loadSession = async () => {
    //TODO: Implement a loading Session function
}

module.exports = mongoose.model('Session', SessionSchema);