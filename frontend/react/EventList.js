const React = require('react');
const EventFrame = require('./EventFrame');

//TODO: Design Event Chronology

//TODO: Show connectedness

module.exports = class EventList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate(){
        const {session} = this.props;
        if (session.state.cancelSelection){
            session.setState({cancelSelection: false})
        }
    }

    render(){
        const {events, session} = this.props;
        return (
            <div className="eventList">
                {events.map( (event, index) => {
                    return <EventFrame key={index} index={index} event={event} session={session} eventList={this}/>
                })}
            </div>
        )
    }

}