const React = require('react');
//TODO: Design single Event 
//TODO: Event interaction


module.exports = class EventFrame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {selected: false};
    }

    componentDidUpdate(){
        const {session} = this.props;
        if (session.state.cancelSelection){
            this.setState({selected: false});
        }
    }

    onClick(e){
        const {selected} = this.state;
        const {event, session} = this.props;
        if (selected){
            this.setState({selected: false});
            session.removeEventFromSelection(event._id);
        } else {
            this.setState({selected: true}); 
            session.addEventToSelection(event._id); 
        }
    }

    setEventClass(){
        const {event, session, index, focused} = this.props;
        const {selected} = this.state;
        let classes = "event-frame";
        if (selected){
            classes = classes + " selected";
        }
        if (index == 0){
            classes = classes + " root";
        }
        if (focused){
            classes = classes + " focused";
        }
        return classes;
    }

    render(){
        const {event, session, eventList} = this.props;
        const {selected} = this.state;
        return (
            <div id={"event-" + event._id} className={this.setEventClass()} event-id={event._id} onClick={(e) => this.onClick(e)}>

                <div className="related-events-control">
                {
                    selected && event.source_events.length > 0 ?
                    <button onClick={() => eventList.showRelatedEvents(event._id)}> ^^^ </button>
                    : null
                }
                {
                    event.source_events.length > 0 ?
                    <div className="related-events-preview">
                        {
                            event.source_events.map( (event, index) => {
                                return <div key={"event-bubble-" + index} className="event-bubble"> </div>
                            })
                        }
                    </div>
                    : null
                }
                </div>
                <div className="main-info">
                    <div className="context-info">
                        {
                            event.context == "main plot" ?
                            <span className="degree"> {event.degree} </span>
                            : null
                        }
                        <span className="context"> {event.context} </span>
                    </div>
                    <div className="event-content">
                        <p> {event.content} </p>
                    </div>
                </div>
                <div className="veto-control">
                    {
                        selected ?
                        <button onClick={() => session.vetoEvent(event._id)}> Veto </button>
                        : null
                    }
                    {
                        event.veto_count > 0 ?
                        <p> Vetos: {event.veto_count} </p>
                        : null
                    }
                </div>
                {
                    selected ? 
                    <div className="creation-info">
                        <span> {event.author} </span>
                        <span> {event.creation_date} </span>
                    </div>
                    : null
                }
                
            </div>
        )
    }

}