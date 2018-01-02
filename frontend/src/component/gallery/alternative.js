import Node from "../graph/node";

export default class Alternative extends Node {
    // constructor(refrence) {
    //     super(refrence);
    // }

    get Selected() {
        return super.Selected;
    }
    set Selected(value) {
        this.Selectable = true;
        super.Selected = value;
        this.Selectable = false;
    }

    OnLoad() {
        super.OnLoad();
        this.Selectable = false;
        var _this = this;
        var graph = _this.Graph;

        this.OnTapHandler = function () {
            if (graph.Modifier1) {

            }
            else if (graph.Modifier2) {

            }
            else if (graph.Modifier3) {

            }
            else {
                if (_this.Selected === false) _this.Selected = true;
            }
        }

        this.OnBoxHandler = function () {
            if (graph.Modifier1) {
                _this.Selected = false;
            }
            else if (graph.Modifier2) {

            }
            else if (graph.Modifier3) {

            }
            else {
                _this.Selected = true;
            }
        }
    }
}