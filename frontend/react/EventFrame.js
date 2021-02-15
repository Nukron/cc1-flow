const React = require('react');
const VetoButton = require('./buttons/VetoButton')
//TODO: Design single Event 
//TODO: Event interaction


module.exports = class EventFrame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {selected: false};
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
        const {event, session, index} = this.props;
        const {selected} = this.state;
        let classes = "event-frame";
        if (selected){
            classes = classes + " selected";
        }
        if (index == 0){
            classes = classes + " root";
        }
        return classes;
    }

    render(){
        const {event, session} = this.props;
        const {selected} = this.state;
        return (
            <div className={this.setEventClass()} event-id={event._id} onClick={(e) => this.onClick(e)}>
                <p> {event.content} </p>
                {
                    selected ?
                    <button onClick={session.vetoEvent(event._id)}> Veto </button>
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