import Node from "./node";

export default class Grip extends Node {
    constructor(refrence) {
        super(refrence);
        this.Container = null;
        this.Corner = null;
    }

    OnLoad() {
        //this.Selectable = false;
        //this.Grabbable = false;
        this.Style('shape', 'square');
        this.Style('visibility', 'hidden');
        this.Style('width', '10px');
        this.Style('height', '10px');
    }
}