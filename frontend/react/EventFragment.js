const React = require('react');

module.exports = class EventFrame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {expanded: false};
    }

    previewContent(){
        const length = 50;
        const {event} = this.props;
        const content = event.content;
        return content.length < length ? content : content.slice(0, length) + "...";
    }

    expandContract(){
        const {expanded} = this.state;
        if (expanded){
            this.setState({expanded: false});
        } else {
            this.setState({expanded: true});
        }
    }

    render(){
        const {event} = this.props;
        const {expanded} = this.state;
        return ( 
            <div className="event-fragment" onClick={() => this.expandContract()}>
                <a className="jump-to-event" href={"#event-" + event._id}> ^^ <br/> go to event </a>
                <p> {expanded ? event.content : this.previewContent()} </p>
            </div>
        )
    }

}