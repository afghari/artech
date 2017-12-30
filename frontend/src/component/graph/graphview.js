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
        this.Graph.Load();
    }

    render() {
        var output =
            <div id={this.Graph.ID}></div>
            ;
        return output;
    }

}
