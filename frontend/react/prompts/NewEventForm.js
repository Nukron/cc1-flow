const React = require('react');
const FlowCounter = require('../components/FlowCounter');
const EventFragment = require('../EventFragment');


//TODO: Make a context switch

module.exports = class NewEventForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            degree: 1,
            content: "",
            author: "a_visitor",
            context: "background",
        };
    }

    setContext(value){
        this.setState({context: value});
    }

    setContent(value){
        this.setState({content: value});
    }

    setDegree(n){
        this.setState({degree: n})
    }

    createEvent(){
        const {degree, content, author, context} = this.state;
        const {selected, session} = this.props;
        const event = {
            degree,
            content,
            source_events: selected,
            author,
            context
        }
        console.log(event);
        session.addEvent(event);
    }

    render(){
        const {selected, session} = this.props;
        const {root_event} = session.state.session;
        console.log(session);
        return (
            <div id="add-event" className="add-event-form">
                {selected.map( (event_id, index) => {
                    return <EventFragment key={index} event={session.state.events.find(event => event._id == event_id)}/>
                })}
                <div className="content">
                    <p> What happens next? </p>
                    <textarea name="content" onChange={(react) => this.setContent(react.target.value)}/>
                </div>
                <div className="context-switch">
                    {
                        root_event ?
                        ["background", "character", "main plot"].map(context => {
                            return <button className={this.state.context == context ? "active" : null} key={"context-switch-" + context} onClick={() => this.setContext(context)}> {context} </button>
                        })
                        : null
                    }
                </div>
                {
                    this.state.context == "main plot" ?
                    <FlowCounter add_event={this} />
                    : null
                }
                <button onClick={() => this.createEvent()}> Create Event </button> 
            </div>
        )
    }

}