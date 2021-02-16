const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    degree: Number,
    content: String,
    veto_count: Number,
    source_events: Array,
    author: String,
    context: String,
    creation_date: Date
});

EventSchema.statics.increaseVeto = async function() {
    
}

EventSchema.statics.createEvent = function(event) {
    return createEvent(event);
}

EventSchema.statics.createTestEvent = function(){
    return createEvent({
        degree: 1,
        content: "One day the sun stopped rising",
        source_events: [],
        author: 'anonymous',
        context: 'main',
    })
}

EventSchema.statics.deleteEvent = async function(id) {
    try {
        await this.deleteOne({_id: id})
    }
    catch (err) {
        console.log(err);
    }
}

const Event = mongoose.model('Event', EventSchema);

const createEvent = function(event){
    return new Event({
        degree: event.degree,
        content: event.content,
        veto_count: 0,
        source_events: event.source_events,
        author: event.author,
        context: event.plotline,
        creation_date: Date.now()
    })
}

module.exports = Event;
