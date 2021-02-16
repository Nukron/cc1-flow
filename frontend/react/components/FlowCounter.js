const React = require('react');

//TODO: Design single Event 

//TODO: Event interaction


module.exports = class FlowCounter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            degree: 1,
            units: 4
        }
    }

    setDegree(n){
        const {add_event} = this.props;
        this.setState({degree: n});
        add_event.setDegree(n);
    }

    render(){
        const {units, degree} = this.state;
        return (
            <div id="flow-control" className="flow-counter">
                <div className="flow-degree-selection">
                    {
                        [1, 2, 4].map(n => {
                           return <button className={n <= degree ? "active" : null} key={"degree-" + n} onClick={() => this.setDegree(n)}> {n} </button>
                        })
                    }
                </div>
                <p><span className="label"> Flow Units: </span> {units - degree} </p>
            </div>
        )
    }

}