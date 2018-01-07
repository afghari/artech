import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './js/registerServiceWorker';
import './js/startup';
import './css/style.css';
import GraphView from './component/graph/graphview';
import Point from './component/graph/point';
import Alternative from './component/gallery/alternative';
import Collection from './component/gallery/collection';
import Gallery from './component/gallery/gallery';


var gallery = new Gallery('gallery');
gallery.OnReady = function () {

    var c1 = gallery.Add(Collection);
    c1.Position = new Point(200, 200);
    c1.Expand();
    for (var i = 0; i < 3; i++) {
        var a = gallery.Add(Alternative);
        c1.Append(a);
        a.Move(30 * i, 30 * i);
    }

    var c2 = gallery.Add(Collection);
    c2.Position = new Point(420, 200);
    c2.Expand();
    for (var i = 0; i < 7; i++) {
        var a = gallery.Add(Alternative);
        c2.Append(a);
    }
    c2.Makeup();

    var c3 = gallery.Add(Collection);
    c3.Position = new Point(310, 420);
    c3.Expand(420, 200);
    var a = gallery.Add(Alternative);
    c3.Append(a);
}
ReactDOM.render(<GraphView graph={gallery} />, $('#root')[0]);
registerServiceWorker();
