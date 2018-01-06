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

var gallery = new Gallery('graphview');
gallery.OnReady = function () {

    // var a1 = gallery.Add(Alternative, 'a1');
    // var a2 = gallery.Add(Alternative, 'a2');
    // var c = gallery.Add(Collection, 'c');
    // c.Position = new Point(310, 120);
    // c.Expand(420, 200);
    // c.Append(a1);
    // c.Append(a2);
    // a1.Position = new Point(200, 100);
    // a2.Position = new Point(300, 100);

    // a1.OnSelfDrag(function (sender) {
    //     //console.log(sender.ID);
    //     //sender.SetParent(null);
    // });

    // a1.OnSelfFree(function (sender) {
    //     //console.log(sender.ID);
    //     //sender.UnParent();
    //     //sender = c;
    //     //sender.SetParent(c);
    // });

    // a2.OnSelfDrag(function (sender) {
    //     console.log(sender.ID);
    //     //sender.UnParent();
    // });



    // gallery.Refrence.on('grabon', function (event) {
    //     var parent = a.Parent;
    //     if (parent && !parent.Grabbed) {

    //         var t1 = event.target;
    //         var id = t1.id();
    //         console.log('grabon ' + id);
    //         t1._private.data.parent = null;
    //         var children = parent.Refrence._private.children;
    //         var index = children.indexOf(t1);
    //         if (index > -1) children.splice(index, 1);
    //         console.log(children);
    //     }
    // });

    // gallery.Refrence.on('grab', function (event) {

    //     var id = event.target.id();
    //     console.log('grab ' + id);
    // });

    // gallery.Refrence.on('free', function (event) {
    //     var parent = a.Parent;
    //     if (parent && !parent.Grabbed) {
    //         var id = event.target.id();
    //         //c3.g
    //         console.log('free ' + id);
    //     }
    // });

    // a = gallery.Add(Alternative, 't2');
    // a.Position = new Point(100, 50);

    //return;
    // a.OnTapStart(function (sender) {
    //     var t1 = sender.Graph.Get('t1');
    //     var t2 = sender.Graph.Get('t2');
    //     //t2.Parent = sender.Graph.Get('c1');
    //     t2.Position = sender.Position;
    //     t1.Parent = t2;
    //     t2.Grabbable = true;
    //     // t2.Refrence.emit('grabon');
    //     // t2.Parent = null;
    // });

    // a.OnTapEnd(function (sender) {
    //     var t2 = sender.Graph.Get('t2');
    //     t2.Parent = null;
    // });
    // a.OnMove(function (sender) {
    //     var t1 = sender.Graph.Get('t1');
    //     var t2 = sender.Graph.Get('t2');
    //     //t1.Parent = null;
    //     t1.Refrence.emit('grabon');
    //     // var p = new Point(sender.Position.X, sender.Position.Y);
    //     t1.Position = t1.Position;
    //     // console.log(t2.Position);
    //     //t2.Selected = !t2.Selected;
    //     //console.log(sender.Position);
    // });

    // a = gallery.Add(Alternative, 't2');
    // a.Position = new Point(100, 50);

    // var c1 = gallery.Add(Collection, 'c1');
    // c1.Position = new Point(200, 200);
    // c1.Expand(200, 200);

    // return;

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

    var a1 = null;
    var c1 = gallery.Add(Collection, 'c1');
    c1.Position = new Point(200, 200);
    c1.Expand(200, 200);
    for (let i = 0; i < 3; i++) {
        a1 = gallery.Add(Alternative, 'a' + (i + 1));
        c1.Append(a1);
        a1.Move(30 * i, 30 * i);
    }

    var c2 = gallery.Add(Collection, 'c2');
    c2.Position = new Point(420, 200);
    c2.Expand(200, 200);
    for (let i = 0; i < 3; i++) {
        a1 = gallery.Add(Alternative, 'a' + (i + 4));
        c2.Append(a1);
        a1.Move(30 * i, 30 * i);
    }

    var c3 = gallery.Add(Collection, 'c3');
    c3.Position = new Point(310, 420);
    c3.Expand(420, 200);
}
ReactDOM.render(<GraphView graph={gallery} />, $('#root')[0]);
registerServiceWorker();