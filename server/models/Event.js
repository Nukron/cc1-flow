const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    //TODO: Implement a Schema for an Event
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