const React = require('react');
const EventFrame = require('./EventFrame');
const EventFragment = require('./EventFragment');
const FlowConnector = require('./components/FlowConnector');

//TODO: Design Event Chronology

//TODO: Show connectedness
//TODO: Implement flow-view? (Events are shown as blobs and degree and connected with arrows)

module.exports = class EventList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showRelated: false,
            relatedEvents: [],
            focusedEvent: ""
        }
    }

    componentDidUpdate(){
        const {session} = this.props;
        if (session.state.cancelSelection){
            session.setState({cancelSelection: false})
        }
    }

    resetView(){
        this.setState({showRelated: false, relatedEvents: [], focusedEvent: ""});
    }

    showRelatedEvents(target_id){
        console.log("Show related events...");
        const {events} = this.props;
        const target_event = events.find(e => e._id == target_id);
        this.setState({showRelated: true});
        this.setState({focusedEvent: target_id});
        this.setState({relatedEvents: events.filter(event => {
            return target_event.source_events.some(id => id == event._id)
        })});
    }

    render(){
        const {events, session} = this.props;
        const {showRelated, relatedEvents, focusedEvent} = this.state;
        console.log(relatedEvents);
        return (
            <div className="event-list">
                {events.map( (event, index) => {
                    return (
                        showRelated && focusedEvent == event._id ?
                        <div className="show-related-events">
                            {
                                relatedEvents.map( (event, index) => {
                                    return (
                                        <div className="event-container" key={index}>
                                            <EventFragment event={event} />
                                            <FlowConnector degree={1}/>
                                        </div>
                                    )
                                })
                            }
                            <div className="hide-related-events" onClick={() => this.resetView()}> hide <br/> vv </div>
                            <EventFrame key={index} index={index} event={event} session={session} eventList={this} focused={true}/>
                        </div>
                        : <div className="event-container" key={index}>
                            {
                                index > 0 ?
                                <FlowConnector degree={event.degree}/>
                                : null
                            }
                            <EventFrame index={index} event={event} session={session} eventList={this}/>
                        </div>
                    )
                })}
            </div>
            
        )
    }

}