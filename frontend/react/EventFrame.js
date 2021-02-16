const React = require('react');
//TODO: Design single Event 
//TODO: Event interaction


module.exports = class EventFrame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {selected: false};
    }

    componentDidUpdate(){
        const {session} = this.props;
        if (session.state.cancelSelection){
            this.setState({selected: false});
        }
    }

    onClick(e){
        const {selected} = this.state;
        const {event, session} = this.props;
        if (selected){
            this.setState({selected: false});
            session.removeEventFromSelection(event._id);
        } else {
            this.setState({selected: true}); 
            session.addEventToSelection(event._id); 
        }
    }

    renderVetos(count){
        let vetos = [];
        for(let i = 0; i < count; i++){
            vetos.push(<div className="veto-bubble" key={"veto-" + i}></div>);
        }
        return vetos;
    }

    setEventClass(){
        const {event, session, index, focused} = this.props;
        const {selected} = this.state;
        let classes = "event-frame";
        if (selected){
            classes = classes + " selected";
        }
        if (index == 0){
            classes = classes + " root";
        }
        if (focused){
            classes = classes + " focused";
        }
        return classes;
    }

    render(){
        const {event, session, eventList} = this.props;
        const {selected} = this.state;
        return (
            <div id={"event-" + event._id} className={this.setEventClass()} event-id={event._id} onClick={(e) => this.onClick(e)}>

                <div className="related-events-control">
                {
                    selected && event.source_events.length > 0 ?
                    <button onClick={() => eventList.showRelatedEvents(event._id)}> ^^^ </button>
                    : null
                }
                {
                    event.source_events.length > 0 ?
                    <div className="related-events-preview">
                        {
                            event.source_events.map( (event, index) => {
                                return <div key={"event-bubble-" + index} className="event-bubble"> </div>
                            })
                        }
                    </div>
                    : null
                }
                </div>
                <div className="main-info">
                    <div className="context-info">
                        {
                            event.context == "main plot" ?
                            <span className="degree"> {event.degree} </span>
                            : null
                        }
                        <span className="context"> {event.context} </span>
                    </div>
                    <div className="event-content">
                        <p> {event.content} </p>
                    </div>
                </div>
                <div className="veto-control">
                    {
                        selected ?
                        <div className="button veto" onClick={() => session.vetoEvent(event._id)}>
                            <svg id="Bold" enableBackground="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m22.25 1h-2.5c-.965 0-1.75.785-1.75 1.75v11.5c0 .965.785 1.75 1.75 1.75h2.5c.965 0 1.75-.785 1.75-1.75v-11.5c0-.965-.785-1.75-1.75-1.75z"/><path d="m5.119.75c-1.95 0-3.61 1.4-3.94 3.32l-1.12 6.5c-.42 2.45 1.46 4.68 3.94 4.68h4.72s-.75 1.5-.75 4c0 3 2.25 4 3.25 4s1.5-.5 1.5-3c0-2.376 2.301-4.288 3.781-5.273v-12.388c-1.601-.741-4.806-1.839-9.781-1.839z"/></svg>
                            <span> Veto </span>
                        </div>
                        : null
                    }
                    {
                        event.veto_count > 0 ?
                        <div className="veto-count">
                            {this.renderVetos(event.veto_count)}
                        </div>
                        : null
                    }
                </div>
                {
                    selected ? 
                    <div className="creation-info">
                        <span> {event.author} </span>
                        <span> {event.creation_date} </span>
                    </div>
                    : null
                }
                
            </div>
        )
    }

}