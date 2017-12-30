import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './js/registerServiceWorker';
import './css/style.css';
import GraphView from './component/graph/graphview';
import Graph from './component/graph/graph';
import Node from './component/graph/node';
import Point from './component/graph/point';
import Selection from './component/gallery/selection';

var graph = new Graph('graphview');
var callback = function () {
    graph.AllowZoom = false;
    var s1 = graph.Add(Selection);
    s1.Position = new Point(200, 200);
    s1.Width = 300;
    s1.Height = 200;

    for (let i = 0; i < 10; i++) {
        var location = (i + 1) * 70;
        var n1 = graph.Add(Node);
        n1.Position = new Point(location, 30);
        n1.Style.Css('background-size', 'mapData(bar, 0, 10, 0, 100)');
        //n1.Style.Shape = 'triangle';
        if (i === 2) {
            n1.Style.Css('background-color', 'blue');
        }
    }

};

var root = document.getElementById('root');
ReactDOM.render(<GraphView graph={graph} />, root, callback);
registerServiceWorker()

