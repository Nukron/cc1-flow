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
                {
                    selected ?
                    <button onClick={() => eventList.showRelatedEvents(event._id)}> source </button>
                    : null
                }
                <p> {event.content} </p>
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
        )
    }

}