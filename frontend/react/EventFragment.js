const React = require('react');
const VetoButton = require('./buttons/VetoButton')

module.exports = class EventFrame extends React.Component {

    constructor(props) {
        super(props);
    }

    previewContent(){
        const length = 200;
        const {event} = this.props;
        const content = event.content;
        return content.length < length ? content : content.slice(0, length) + "...";
    }

    render(){
        return ( 
            <div>
                <p> {this.previewContent()} </p>
            </div>
        )
    }

}