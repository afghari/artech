import React, { Component } from 'react';
import cytoscape from 'cytoscape';
import Graph from './graph.js';
import Node from './element.js';

export default class GraphView extends Component {

    constructor(props) {
        super(props);
        this._cy = null;
        this.state = { cy: this._cy }
    }

    componentDidMount() {
        this.setState({ cy: this.cy });
    }

    componentWillUnmount() {
    }

    IsIn(node) {
        var cy = node.cy();
        var bnd = cy.$('#parent').boundingBox();
        var position = node.position();
        var x = position.x;
        var y = position.y;
        var isInX = x > bnd.x1 && x < bnd.x2;
        var isInY = y > bnd.y1 && y < bnd.y2;
        var isIn = isInX && isInY;
        return isIn;
    }

    get cy() {

        var instance = this;
        if (this._cy == null) {

            var cy = cytoscape({ container: document.getElementById(this.props.id) });
            //cy.autoungrabify( true );
            cy.boxSelectionEnabled(true);
            cy.zoomingEnabled(false);
            cy.add(
                {
                    group: "nodes", data: { id: "parent" }, position: { x: 200, y: 300 },
                    style: {
                        shape: "rectangle",
                        // width: 300, height: 500,
                        'background-color': 'red',
                        'padding': '30px'
                    }
                }
            );

            cy.add({ group: "nodes", data: { id: "n0" }, position: { x: 500, y: 300 } });

            cy.add({
                group: "nodes", data: { id: "n4", parent: 'parent' }, position: { x: 200, y: 300 },

            });
            cy.add({
                group: "nodes", data: { id: "n5", parent: 'parent' }, position: { x: 150, y: 300 },

            });

            cy.on('free', function (evt) {
                var node = evt.target;
                if (node.id() !== 'parent' && !node.parent().grabbed()) {
                    var isIn = instance.IsIn(node);
                    if (isIn) {
                        node.move({ parent: 'parent' });
                        //console.log(node.id());
                    }
                    //console.log('free');
                    //var n1 = new Node();
                    var graph = new Graph();
                    // graph.Add(n1);
                }
            });

            cy.on('position', function (evt) {
                var node = evt.target;
                console.log(node.id());
                if (node.id() !== 'parent' && !node.parent().grabbed()) {
                    node.move({ parent: null });
                    //console.log(node.position().x);
                }
            })

            // function setParent(node)
            // {
            //     setTimeout(() => {
            //         node.move({ parent: 'parent' });
            //         console.log('dddd');
            //     }, 3000);
            // }

            // cy.$('#n0').on('drag', function (evt) {
            //     var node = evt.target;
            //     setTimeout(function()
            //     {
            //         var newNode=node=cy.$('#n0')
            //         .move({ parent: null })
            //         //.data('id','n0');
            //         console.log(newNode.id());
            //     },1000);
            //     console.log(node.position().x);
            // })

            this.setState({ cy: cy });

            this._cy = cy;
        }
        return this._cy;
    }

    render() {
        var output =
            <div id={this.props.id}></div>
            ;
        return output;
    }

}
