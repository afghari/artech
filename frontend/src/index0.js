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

console.warn = function () { }

var gallery = new Gallery('gallery');
gallery.OnReady = function () {

    var a1 = null;
    var c1 = gallery.Add(Collection, 'c1');
    c1.Position = new Point(200, 200);
    c1.Expand();
    for (let i = 0; i < 3; i++) {
        a1 = gallery.Add(Alternative, 'a' + (i + 1));
        c1.Append(a1);
        a1.Move(30 * i, 30 * i);
    }

    var c2 = gallery.Add(Collection, 'c2');
    c2.Position = new Point(420, 200);
    c2.Expand();
    for (let i = 0; i < 3; i++) {
        a1 = gallery.Add(Alternative, 'a' + (i + 4));
        c2.Append(a1);
    }
    c2.Makeup();

    var c3 = gallery.Add(Collection, 'c3');
    c3.Position = new Point(310, 420);
    c3.Expand(420, 200);
    var a7 = gallery.Add(Alternative, 'a7');
    c3.Append(a7);
    
}
ReactDOM.render(<GraphView graph={gallery} />, $('#root')[0]);
registerServiceWorker();