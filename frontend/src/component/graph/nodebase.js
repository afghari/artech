import Element from './element';
import Point from './point';

export default class NodeBase extends Element {

    constructor() {
        super();
        this.Bounding = new Bounding(this);
    }

    get Parent() {
        var parentID = this.Data('parent');
        var result = this.Graph.Get(parentID);
        return result;
    }

    // set Parent(element) {
    //     var parentID = element ? element.ID : null;
    //     this.Refrence.move({ parent: parentID });
    //     this.OnLoad();
    // }

    set Parent(value) {
        if (value) {
            this.Refrence._private.data.parent = value.ID;
            value.Refrence._private.children.push(this.Refrence);
        }
        else {
            var parent = this.Parent;
            if (parent) {
                this.Refrence._private.data.parent = null;
                var children = parent.Refrence._private.children;
                var index = children.indexOf(this.Refrence);
                if (index > -1) {
                    children.splice(index, 1);
                    parent.Refrence._private.children=children;
                }
            }
        }
    }


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
    }

    Move(x, y) { this.Refrence.shift({ x: x, y: y }); }

    IsOn(node) {
        var position = this.Position;
        var bounding = node.Bounding;
        var isOnX = position.X > bounding.From.X && position.X < bounding.To.X;
        var isOnY = position.Y > bounding.From.Y && position.Y < bounding.To.Y;
        var result = isOnX && isOnY;
        return result;
    }
}


class Bounding {
    constructor(owner) {
        this.Owner = owner;
    }

    get From() {
        var from = this.Owner.Refrence.boundingBox();
        var result = new Point(from.x1, from.y1);
        return result;
    }

    get To() {
        var from = this.Owner.Refrence.boundingBox();
        var result = new Point(from.x2, from.y2);
        return result;
    }
}

