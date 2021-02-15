const React = require('react');
const VetoButton = require('./buttons/VetoButton')
//TODO: Design single Event 
//TODO: Event interaction


module.exports = class EventFrame extends React.Component {

    constructor(props) {
        super(props);
    }

    previewContent(){
        const length = 200;
        const {event} = this.props;
        const content = event.content;
        return content.length < 200 ? content : content.slice(0, length) + "...";
    }

    render(){
        return ( 
            <div>
                <p> {this.previewContent()} </p>
            </div>
        )
    }

}