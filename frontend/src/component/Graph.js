import React, { Component } from 'react';
import cytoscape from 'cytoscape';

export default class Graph extends Component {

    constructor(props) {
        super(props);
        this._cy = null;
        this.state = { cy: this._cy }
        //this.handleNvEvent = this.handleNvEvent.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
    }


    handleDoubleClick(event) {
        if (this.state.cy != null) {
            // this.cy.add(
            //     // data: { id: "n7" },
            //     { group: "nodes", position: { x: 300, y: 300 } },
            // );
            //this.setState({ cy: this.cy });
        }
    }

    // handleNvEvent(value) {
    //     this.props.onNvEvent(value);
    // }

    componentDidMount() {
        this.setState({ cy: this.cy });
    }

    componentWillUnmount() {
    }



    get cy() {
        if (this._cy == null) {

            var cy = cytoscape({ container: document.getElementById(this.props.id) });
            //cy.autoungrabify( true );
            cy.boxSelectionEnabled(true);
            cy.zoomingEnabled(false);
            cy.add({ group: "nodes", data: { id: "n0" }, position: { x: 500, y: 300 }, shape: "rectangle" });
            cy.add({
                group: "nodes", data: { id: "n1" }, position: { x: 200, y: 300 },
                style: { 
                    shape: "rectangle", width: 300, height: 100, 
                    'background-color': 'red',
                }
            });
            cy.add({
                group: "nodes", data: { id: "n4", parent: 'n1' }, position: { x: 200, y: 300 },

            });
            cy.add({
                group: "nodes", data: { id: "n5", parent: 'n1' }, position: { x: 150, y: 300 },

            });
            cy.add({
                group: "nodes", data: { id: "n6", parent: 'n1' }, position: { x: 150, y: 300 },

            });

            cy.batch(function () {
                cy.$('#j')
                    .data('weight', '70')
                    .addClass('square')
                    ;
            });

            this.setState({ cy: cy });

            this._cy = cy;
        }
        return this._cy;
    }

    render() {
        var output =
            <div id={this.props.id} onDoubleClick={this.handleDoubleClick}></div>
            ;
        return output;
    }

}
