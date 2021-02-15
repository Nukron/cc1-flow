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
            <div className="notice">
                <p> There is no origin event yet. Please add the first event to begin the Flow! </p>
            </div>
        )
    }

}