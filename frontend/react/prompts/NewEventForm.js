const React = require('react');
const CloseFormButton = require('../buttons/CloseFormButton');

//TODO: Design single Event 

//TODO: Event interaction


module.exports = class NewEventForm extends React.Component {

    constructor(props) {
        super(props);
    }

    createEvent(){
        let addEvent = document.getElementById("add-event");
        let content = addEvent.getElementsByClassName("content")[0].getElementsByTagName("input")[0].value;
        console.log(content);
    }

    render(){
        return (
            <div id="add-event" className="add-event-form">
                <CloseFormButton target="add-event"/>
                <div className="content">
                    <label htmlFor="content"> What happens next? </label>
                    <input type="text" name="content" required/>
                </div>
                <button onClick={() => this.createEvent()}> Create Event </button> 
            </div>
        )
    }

}