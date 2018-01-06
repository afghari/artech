import Container from "../graph/container";

export default class Collection extends Container {
    constructor(refrence) {
        super(refrence);
    }

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
        this.registerOnBoxHandler();
        this.registerOnTap();
    }

    registerOnTap() {
        var _this = this;
        var graph = _this.Graph;
        this.OnTapHandler = function () {
            if (_this.Graph.Modifier1) {
                _this.Selected = false;
            }
            else {
                _this.Selected = !_this.Selected;
            }
        }
    }

    registerOnBoxHandler() {
        var _this = this;
        this.OnBoxHandler = function () {
            _this.Selected = !_this.Graph.Modifier1;
        }
    }
}