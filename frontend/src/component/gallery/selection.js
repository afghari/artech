import Node from "../graph/node";

export default class Selection extends Node {

    constructor(refrence) {
        super(refrence);
        this.Style.Shape = 'rectangle';
        this.Style.Css('background-color', 'green');
        this.Width = 100;
        this.Height = 100;

        this._beforeChildAddPosition = this.Position;
        this.OnBeforeChildAdd = function (sender, child) {
            //sender._beforeChildAddPosition = sender.Position;
            //child.Position=sender.Position;
            //console.log(sender.Position);
        }
        this.OnAfterChildAdd = function (sender, child) {
        
        }

    }

    get Width() { var result = this.Style.Css('width'); return result; }
    set Width(value) { this.Style.Css('width', value); }

    get Height() { var result = this.Style.Css('height'); return result; }
    set Height(value) { this.Style.Css('height', value); }
}