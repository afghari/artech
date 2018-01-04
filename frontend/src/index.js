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

    // a = gallery.Add(Alternative, 't1');
    // a.Position = new Point(50, 50);
    // a.OnMove(function (sender) {
    //     var t1 = sender.Graph.Get('t1');
    //     var t2 = sender.Graph.Get('t2');
    //     t2.Refrence.emit('tap');
    //     // var p = new Point(sender.Position.X, sender.Position.Y);
    //     t2.Position = t1.Position;
    //     // console.log(t2.Position);
    //     //t2.Selected = !t2.Selected;
    //     //console.log(sender.Position);
    // });
    // a = gallery.Add(Alternative, 't2');
    // a.Position = new Point(100, 50);

    // a.OnMove(function (sender) {
    //     var t1 = sender.Graph.Get('t1');
    //     var t2 = sender.Graph.Get('t2');
    //     t1.Refrence.emit('tap');
    //     // var p = new Point(sender.Position.X, sender.Position.Y);
    //     t1.Position = t2.Position;
    //     // console.log(t2.Position);
    //     //t2.Selected = !t2.Selected;
    //     //console.log(sender.Position);
    // });

    var c1 = gallery.Add(Collection, 'c1');
    c1.Position = new Point(200, 200);
    c1.Expand(200, 200);
    for (let i = 0; i < 3; i++) {
        a = gallery.Add(Alternative, 'a' + (i + 1));
        c1.Append(a);
        a.Move(30 * i, 30 * i);
    }

    var c2 = gallery.Add(Collection, 'c2');
    c2.Position = new Point(420, 200);
    c2.Expand(200, 200);
    for (let i = 0; i < 3; i++) {
        a = gallery.Add(Alternative, 'a' + (i + 4));
        c2.Append(a);
        a.Move(30 * i, 30 * i);
    }

    var c3 = gallery.Add(Collection, 'c3');
    c3.Position = new Point(310, 420);
    c3.Expand(420, 200);
}
ReactDOM.render(<GraphView graph={gallery} />, $('#root')[0]);
registerServiceWorker();