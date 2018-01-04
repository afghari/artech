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
        var deltaX = value.X - this.Position.X;
        var deltaY = value.Y - this.Position.Y;
        this.Move(deltaX, deltaY);
        // this.Refrence.position('x', value.X);
        // this.Refrence.position('y', value.Y);
    }

    Move(x, y) { this.Refrence.shift({ x: x, y: y }); }

}
