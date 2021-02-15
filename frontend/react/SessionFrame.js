const React = require('react');
const axios = require('axios');
const EventList = require('./EventList');
const CancelSelectionsButton = require('./buttons/CancelSelectionsButton');
const NewEventForm = require('./prompts/NewEventForm');
const RootEventNotice = require('./prompts/RootEventNotice');
//TODO: Function for Root Event Prompt

module.exports = class FlowSessionFrame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            session: null,
            events: [],
            selectedEvents: []
        };
    }

    componentDidUpdate(){

    }

    addEventToSelection(id){
        console.log("adding event: ", id);
        const {selectedEvents} = this.state;
        this.setState({selectedEvents: selectedEvents.concat(id)})
    }

    removeEventFromSelection(id){
        console.log("removing event: ", id);
        const {selectedEvents} = this.state;
        this.setState({selectedEvents: selectedEvents.filter(e => e !== id)})
    }

    vetoEvent(id){
        axios.post(`http://localhost:3220/events/veto/${id}`)
          .then(res => {
            if (res.data){
                console.log("Added veto: ", id);
            }
            this.refreshSession();
        })
    }

    refreshSession(){
        axios.get(`http://localhost:3220/session`)
          .then(res => {
            this.setState({session: res.data});
            console.log("Axios: ", res.data);
        })
        axios.get(`http://localhost:3220/events`)
          .then(res => {
            this.setState({events: res.data});
            console.log("Axios: ", res.data);
        })
    }

    cancelSelection(){
        console.log("cancel all selections!");
        this.setState({selectedEvents: []})
        //TODO: Propagate down to Events and make selected false
    }

    componentDidMount() {
        this.refreshSession();
    }

    render(){
        const {selectedEvents, session, events} = this.state;
        console.log(selectedEvents);
        return (
            session ? 
                <section className="flow-session">
                    { 
                        selectedEvents.length > 0 ?
                        <CancelSelectionsButton onClick={() => this.cancelSelection()}/>
                        : null
                    }
                    {
                        session.root_event ? 
                        null 
                        : <RootEventNotice/>
                    }
                    {
                        session.root_event ? 
                        null 
                        : <NewEventForm/>
                    }

                    <EventList session={this} events={this.state.events}/>

                    {
                        selectedEvents.length > 0 ?
                        <NewEventForm/>
                        : null
                    }
                </section> 
                : null
        )
    }
}