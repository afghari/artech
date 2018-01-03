import ContainerBase from "./containerbase";
import Grip from "./grip";
import Point from "./point";

export default class Container extends ContainerBase {
    constructor(refrence) {
        super(refrence);
        this.StartDimention = { Width: 200, Height: 200 };
    }

    Append(nodeBase) {
        nodeBase.Position = this.Position;
        nodeBase.Parent = this;
    }

    get Children() {
        var result = [];
        var cyChildren = this.Refrence.children();
        cyChildren.forEach(cyElement => {
            var owner = this.Graph.getOwner(cyElement);
            if (owner) result.push(owner);
        });
        return result;
    }

    get Grips() {
        var children = this.Children;
        var result = children.filter(function (node) {
            var isGrip = node instanceof Grip;
            return isGrip;
        });
        return result;
    }

    Expand(width, height) {
        var grips = this.Grips;
        var grip = grips[1];
        grip.Position = new Point(width - 1, height - 1);
    }

    OnLoad() {
        var _this = this;
        _this.Style('padding', '0px');
        for (var i = 0; i < 2; i++) {
            var grip = this.Graph.Add(Grip);
            grip.Container = _this;
            grip.Corner = i;
            _this.Append(grip);
            grip.OnLoad();
        }
    }
}