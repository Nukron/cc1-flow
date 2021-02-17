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

    renderFlowUnits(n){
        const {units} = this.state;
        const unitElements = [];
        for(let i = 0; i < units; i++){
            unitElements.push(<div className={"unit" + (units - n > i ? " active" : " spent")} key={i}> </div>)
        }
        return unitElements
    }

    render(){
        const {degree} = this.state;
        return (
            <div id="flow-control" className="flow-counter">
                <div className="flow-degree-selection">
                    {
                        [1, 2, 4].map(n => {
                           return <div className={n <= degree ? "active" + " degree-" + n : null} key={"degree-" + n} onClick={() => this.setDegree(n)}> {n} </div>
                        })
                    }
                </div>
                <div className="units-counter">
                    {this.renderFlowUnits(degree)}
                </div>
            </div>
        )
    }

}