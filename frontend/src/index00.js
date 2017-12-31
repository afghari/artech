import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './js/registerServiceWorker';
import './css/style.css';
import GraphView from './component/graph/graphview';
import Graph from './component/graph/graph';
import Point from './component/graph/point';
import Selection from './component/gallery/collection';
import Alternative from './component/gallery/alternative';
import Node from './component/graph/node';
import Collection from './component/gallery/collection';

var graph = new Graph('graphview');
var callback = function () {

    var c1 = graph.Add(Collection);

    // var a1 = graph.Add(Alternative);
    // a1.Position = new Point(100, 100);
    // var a2 = graph.Add(Alternative);
    // a2.Position = new Point(200, 200);
    // var a3 = graph.Add(Alternative);
    //a3.Style.Css('background-color', 'red');
    //a3.Position = new Point(300, 150);

    // var a4 = graph.Add(Alternative);
    // a4.Position = new Point(200, 200);

    // var s1 = graph.Add(Selection);
    // s1.Position = new Point(400, 400);

    // //a1.Style.Css('background-color', 'Magenta');

    // a1.Parent = s1;
    // a2.Parent = s1;
    // a2.Parent = s1;


    // a3.OnDrop = function (element) {
    //     var cy=element.Graph.Refrence;
    //     var clon = element.Refrence.add();
    //     cy.add({
    //         group: "nodes", data: { parent: s1.UID  }, position: { x: 200, y: 300 },

    //     });
    //     //clon.data({ parent: 'sss', height: 176 });
    //     // console.log(clon.data());
    //     // clon.move({ parent: s1.UID });
    //     // var a4 = new Alternative(clon);
    //     // graph.Add(a4);
    //     //s1.Refrence.add(clon);
    //     //a4.Parent = s1;
    //     //var a4 = graph.Add(a4);
    //     //a4.Refrence=clon;
    // }
    //a1.Sele=s1;
    //a2.Parent=s1;
    // var a = null;
    // a3.OnDrag= function (element) {
    //     //console.log(element);
    //     //element.Parent=s1;
    //     //console.log(element.Parent);
    //     console.log(element.Position);
    //     a = s1.Add(a3);
    // }
    // a3.OnDrop = function (element) {
    //     //console.log(element);
    //     //element.Parent=s1;
    //     //console.log(element.Parent);
    //     console.log(a);
    //     //a = s1.Add(a3);
    // }

    //a3
    //a3.Refrence=a;
};

var root = document.getElementById('root');
ReactDOM.render(<GraphView graph={graph} />, root, callback);
registerServiceWorker()

