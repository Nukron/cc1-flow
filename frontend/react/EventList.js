const React = require('react');
const EventFrame = require('./EventFrame');

//TODO: Design Event Chronology

//TODO: Show connectedness

module.exports = class EventList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        
    }

    render(){
        const {events} = this.props;
        return (
            <div className="eventList">
                {events.map( (event, index) => {
                    return <EventFrame key={index} event={event}/>
                })}
            </div>
        )
    }

}