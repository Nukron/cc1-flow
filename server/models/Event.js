const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    id: String,
    degree: Number,
    content: String,
    veto_count: Number,
    source_events: Array,
    author: String,
    plotline: String,
    creation_date: Date,
    creation_time: Number //(seconds)
});


EventSchema.statics.createEvent = async function(new_event) {
    
}

EventSchema.statics.increaseVeto = async function() {

}

EventSchema.statics.deleteEvent = async function() {
    try {

    }
    catch (err) {
        console.log(err);
    }
}

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