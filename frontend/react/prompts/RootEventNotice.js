const React = require('react');

//TODO: Design single Event 

//TODO: Event interaction


module.exports = class RootEventNotice extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render(){

        return (
            <div id="missing-root" className="notice">
                <p> There is no origin event yet. <br/>
                Add the first event to begin the Flow! </p>
            </div>
        )
    }

}