import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './js/registerServiceWorker';
import './css/style.css';
import GraphView from './component/graph/graphview';
import Graph from './component/graph/graph';
import Point from './component/graph/point';
import Selection from './component/gallery/selection';
import Alternative from './component/gallery/alternative';

var graph = new Graph('graphview');
var callback = function () {

    graph.Zoomable = false;
    var s1 = graph.Add(Selection);
    s1.Position = new Point(200, 200);
    s1.Width = 300;
    s1.Height = 200;
    //console.log(s1.Selectable);

    for (var i = 0; i < 10; i++) {
        var location = (i + 1) * 70;
        var n1 = graph.Add(Alternative);
        n1.Position = new Point(location, 30);
        if (i === 2) {
            //n1.Parent=s1;
            n1.Style.Css('background-color', 'red');
            n1.OnAfterMove = function (sender) {
                sender.Style.Css('background-color', 'yellow');
            }
            n1.Parent=s1;
            
            // n1.OnTap = function (sender) {

            // }
        }

        if (i === 3) {
            n1.Parent = s1;
        }
    }

};

var root = document.getElementById('root');
ReactDOM.render(<GraphView graph={graph} />, root, callback);
registerServiceWorker()

