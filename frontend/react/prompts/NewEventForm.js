const React = require('react');
const CloseFormButton = require('../buttons/CloseFormButton');
const EventFragment = require('../EventFragment');

//TODO: Design single Event 

//TODO: Event interaction


module.exports = class NewEventForm extends React.Component {

    constructor(props) {
        super(props);
    }

    createEvent(){
        const {selected, session} = this.props;
        let addEvent = document.getElementById("add-event");
        let content = addEvent.getElementsByClassName("content")[0].getElementsByTagName("textarea")[0].value;
        const event = {
            degree: 1,
            content,
            source_events: selected,
            author: 'a_visitor',
            plotline: 'main'
        }
        session.addEvent(event);
    }

    render(){
        const {selected, session} = this.props;
        return (
            <div id="add-event" className="add-event-form">
                {selected.map( (event_id, index) => {
                    return <EventFragment key={index} event={session.state.events.find(event => event._id == event_id)}/>
                })}
                <div className="content">
                    <p> What happens next? </p>
                    <textarea name="content"/>
                </div>
                <button onClick={() => this.createEvent()}> Create Event </button> 
            </div>
        )
    }

}