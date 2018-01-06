import ContainerBase from "./containerbase";
import Grip from "./grip";

export default class Container extends ContainerBase {
    constructor(refrence) {
        super(refrence);
        this.StartDimention = { Width: 200, Height: 200 };
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

    Append(nodeBase) {
        nodeBase.Position = this.Position;
        nodeBase.Refrence.move({ parent: this.ID });
        nodeBase.OnLoad();
    }

    Expand(width, height) {
        var grips = this.Grips;
        var g0 = grips[0];
        g0.Position = this.Position;
        g0.Move((-width / 2) + 3, (-height / 2) + 3);
        var g1 = grips[1];
        g1.Move((width / 2) - 3, (height / 2) - 3);
    }

    OnLoad() {
        var _this = this;
        _this.Style('padding', '0px');
        for (var i = 0; i < 2; i++) {
            var grip = this.Graph.Add(Grip);
            grip.Container = _this;
            grip.Corner = i;
            _this.Append(grip);
        }

    }
}