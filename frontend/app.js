const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');


//TODO: Function for Root Event Prompt

//TODO: Design Event Chronology

//TODO: Design single Event 

//TODO: Event interaction

//TODO: Show connectedness

class FlowSessionFrame extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        axios.get(`http://localhost:3220/events`)
          .then(res => {
            const events = res.data;
            console.log(events);
          })
      }

    render(){
        return (
            <div className="widget">
            </div>
        )
    }
}


ReactDOM.render(
    <FlowSessionFrame/>, document.getElementById("root")
);