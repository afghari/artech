import Container from "../graph/container";
import Alternative from "./alternative";
import Point from "../graph/point";

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

    get Alternatives() { return super.Nodes; }

    AppendCopy(alternative) {
        var newAlternative = this.Graph.Add(Alternative);
        this.Append(newAlternative);
    }

    Makeup() {
        var alternatives = this.Alternatives;
        var i = 1;
        var padding = 15;
        var nodeDiameter = 30;
        var nodeRadius = nodeDiameter / 2;
        var width = this.StartDimention.Width - padding;
        var height = this.StartDimention.Height - padding;
        var startPositionX = (this.Position.X - width / 2) + nodeRadius;
        var currentLocationX = startPositionX;
        var currentLocationY = (this.Position.Y - height / 2) + nodeRadius;
        alternatives.forEach(alternative => {
            alternative.Position = new Point(currentLocationX, currentLocationY);
            currentLocationX += nodeDiameter + padding / 2;
            if (i % 5 === 0) {
                currentLocationY += nodeDiameter + padding / 2;
                currentLocationX = startPositionX;
            }
            i++;
        });
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
                _this.Selected = true;
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