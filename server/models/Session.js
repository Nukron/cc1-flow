const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    //TODO: Implement a Session Schema
});

SessionSchema.statics.loadSession = async () => {
    //TODO: Implement a loading Session function
}

module.exports = mongoose.model('Session', SessionSchema);