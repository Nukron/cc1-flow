const React = require('react');
const axios = require('axios');
const EventList = require('./EventList');

//TODO: Function for Root Event Prompt

module.exports = class FlowSessionFrame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            session: null,
            events: []
        };
    }

    componentDidUpdate(){

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

    componentDidMount() {
        this.refreshSession();
    }

    render(){
        return (
            <section className="flow-session">
                <EventList events={this.state.events}/>
            </section>
        )
    }
}