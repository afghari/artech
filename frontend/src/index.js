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

    var c1 = gallery.Add(Collection, 'c1');
    
    c1.Position = new Point(50, 200);
    for (let i = 1; i <= 3; i++) {
        var a1 = gallery.Add(Alternative, 'n' + i);
        c1.Append(a1);
        a1.Position = new Point(-30 * i, -10);
    }


    // var c2 = gallery.Add(Collection, 'c2');
    // c2.Position = new Point(300, 200);

}
ReactDOM.render(<GraphView graph={gallery} />, $('#root')[0]);
registerServiceWorker();