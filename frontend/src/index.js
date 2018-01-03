import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './js/registerServiceWorker';
import './css/style.css';
import GraphView from './component/graph/graphview';
import Point from './component/graph/point';
import Alternative from './component/gallery/alternative';
import Collection from './component/gallery/collection';
import Gallery from './component/gallery/gallery';

var gallery = new Gallery('graphview');
gallery.OnReady = function () {

    var a = null;
    var c1 = gallery.Add(Collection, 'c1');
    c1.Expand(200, 200);
    c1.Position = new Point(100, 100);
    for (let i = 0; i < 3; i++) {
        a = gallery.Add(Alternative, 'a' + (i + 1));
        c1.Append(a);
        a.Position = new Point(30 * i, 30 * i);
    }

    var c2 = gallery.Add(Collection, 'c2');
    c2.Expand(200, 200);
    c2.Position = new Point(320, 100);
    for (let i = 0; i < 3; i++) {
        a = gallery.Add(Alternative, 'a' + (i + 4));
        c2.Append(a);
        a.Position = new Point(30 * i, 30 * i);
    }

    var c3 = gallery.Add(Collection, 'c3');
    c3.Position = new Point(100, 320);
    c3.Expand(420, 200);
}
ReactDOM.render(<GraphView graph={gallery} />, $('#root')[0]);
registerServiceWorker();