import React, { Component } from 'react';

export default class GraphView extends Component {

    // constructor(props) {
    //     super(props);
    // }

    get Graph() {
        var result = this.props.graph;
        return result;
    }

    componentDidMount() {
        this.Graph.OnLoad();
    }

    componentWillUnmount() {

    }

    onKeyDown(event) {
        let scrollTop = event.srcElement.body.scrollTop,
            itemTranslate = Math.min(0, scrollTop / 3 - 60);
        this.setState({
            transform: itemTranslate
        });
    }

    render() {
        var output =
            <div id={this.Graph.ID}></div>
            ;
        return output;
    }

}
