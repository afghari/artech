import Point from './point';
//import NodeStyle from './nodestyle';
import NodeBase from './nodebase';

export default class Node extends NodeBase {

    // constructor(s) 
    // {
    //     super(s);    
    // }

    get Position() {
        var x = this.Refrence.position('x');
        var y = this.Refrence.position('y');
        var result = new Point(x, y);
        return result;
    }
    set Position(value) {
        this.Refrence.shift('x', value.X);
        this.Refrence.shift('y', value.Y);
        // this.Refrence.position('x', value.X);
        // this.Refrence.position('y', value.Y);
    }

    // get Parent() {
    //     var result = this.Refrence.parent()[0];
    //     return result;
    //     //.parent( [selector] )
    // }

    // set Parent(value) {
    //     var cyElement = this.Refrence.move({ parent: (value ? value.UID : null) });
    //     this.Refrence = cyElement;
    // }



}
