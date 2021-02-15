const React = require('react');

//TODO: Design single Event 

//TODO: Event interaction


module.exports = class EventFrame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {selected: false};
    }

    componentDidMount() {
    }

    onClick(e){
        const {selected} = this.state;
        if (selected){
            this.setState({selected: false});
        } else {
            this.setState({selected: true});  
        }
    }

    render(){
        const {event} = this.props;
        return (
            <div className={this.state.selected ? "event-frame selected" : "event-frame"} event-id={event.id} onClick={(e) => this.onClick(e)}>
                <p> {event.content} </p>
            </div>
        )
    }

}