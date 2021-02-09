const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    id: String,
    degree: Number,
    content: String,
    veto_count: Number,
    source_events: Array,
    author: String,
    plotline: String
});

EventSchema.statics.deleteRelatedEvents = async function()
{
    try
    {
        //TODO: Implement recursive function that deletes related Elements
    }
    catch (err)
    {
        return console.error(err);
    }
};

module.exports = mongoose.model('Event', EventSchema);