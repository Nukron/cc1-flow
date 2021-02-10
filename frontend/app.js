const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');


class FlowSessionFrame extends React.Component {

    constructor(props) {
        super(props);
    }

    changePoints(v){
        this.setState((state) => ({points: (state.points + v) >= 0 && (state.points + v) <= 4 ? state.points + v : state.points}));
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