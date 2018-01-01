import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './js/registerServiceWorker';
import './css/style.css';
import GraphView from './component/graph/graphview';
import Graph from './component/graph/graph';
import Node from './component/graph/node';
import Point from './component/graph/point';
import Container from './component/graph/container';

var graph = new Graph('graphview');
graph.Ready = function () {
    var n1 = graph.Add(Node, 'n1');
    n1.Position = new Point(100, 100);

    //var g1 = graph.Add(Grip);
    //var g2 = graph.Add(Grip);

    var c1 = graph.Add(Container, 'c1');
    //c1.Append(g1);
    c1.Position = new Point(200, 200);
    // n1.OnMove(function (sender) {
    //     console.log(sender.ID + ':[' + sender.Position.X + ',' + sender.Position.Y + ']');
    // });
    //console.log(n1.Position);

    // var cy=graph.Refrence;
    // cy.$('#g1').style('backgroundColor','red');
    // cy.$('#g1').style('shape','square');
    // cy.$('#g1').style('width','10px');
    // cy.$('#g1').style('height','10px');
    // cy.$('#g1').style('segment-distances','50px');
    //cy.$('#g1').style('visibility','hidden');
    
    
    //console.log(cy.$('#g1').style());

}
ReactDOM.render(<GraphView graph={graph} />, $('#root')[0]);
registerServiceWorker();