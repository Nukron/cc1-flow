const React = require('react');
const axios = require('axios');
const EventList = require('./EventList');
const CancelSelectionsButton = require('./buttons/CancelSelectionsButton');
const NewEventForm = require('./prompts/NewEventForm');
const RootEventNotice = require('./prompts/RootEventNotice');

//TODO: Implement Climax?

module.exports = class FlowSessionFrame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            session: null,
            events: [],
            selectedEvents: [],
            cancelSelection: false,
            climax: 0
        };
    }

    addEvent(event){
        const this2 = this;
        axios.post(`/events/add`, event)
          .then(function (response) {
            console.log("added new event!");
            setTimeout(() => this2.refreshSession(), 200);
            this2.cancelSelection();
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    addEventToSelection(id){
        const {selectedEvents} = this.state;
        this.setState({selectedEvents: selectedEvents.concat(id)})
    }

    removeEventFromSelection(id){
        const {selectedEvents} = this.state;
        this.setState({selectedEvents: selectedEvents.filter(e => e !== id)})
    }

    vetoEvent(id){
        const this2 = this;
        axios.post(`/events/veto/${id}`)
          .then(() => {
                console.log("Added veto: ", id);
                setTimeout(() => this2.refreshSession(), 200);
        })
    }

    refreshSession(){
        console.log("Refreshing");
        axios.get(`/session`)
          .then(res => {
            this.setState({session: res.data});
            console.log("Axios: ", res.data);
        })
        axios.get(`/events`)
          .then(res => {
            this.setState({events: res.data});
            console.log("Axios: ", res.data);
        })
    }

    cancelSelection(){
        console.log("cancel all selections!");
        this.setState({selectedEvents: []})
        this.setState({cancelSelection: true})
    }

    componentDidMount() {
        this.refreshSession();
    }

    render(){
        const {selectedEvents, session, events} = this.state;
        return (
            session ? 
                <section className="flow-session">
                    {
                        session.root_event ? 
                        null 
                        : <RootEventNotice/>
                    }
                    {
                        session.root_event ? 
                        null 
                        : <NewEventForm selected={selectedEvents} session={this}/>
                    }
                    {
                        events.length > 0 ?
                        <EventList session={this} events={this.state.events}/>
                        : null
                    }
                    <footer>
                    { 
                        selectedEvents.length > 0 ?
                        //FIXME: Events only work on the "real" HTML-Elements
                        <img onClick={() => this.cancelSelection()} className="cancel" src="./graphics/cancel.png"/>
                        : null
                    }
                    {
                        selectedEvents.length > 0 ?
                        <NewEventForm selected={selectedEvents} session={this}/>
                        : null
                    }
                    </footer>
                </section> 
                : null
        )
    }
}