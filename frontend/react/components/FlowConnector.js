const React = require('react');


module.exports = class EventList extends React.Component {

    constructor(props) {
        super(props);
       
    }

    render(){
        const {degree} = this.props;
        return (
            <img className={"connector" + " " + "degree-" + degree} src={"./graphics/arrow-" + (degree >= 4 ? "twist" : degree >= 2 ? "turn" : "advance") + ".svg"}/>
        )
    }

}

