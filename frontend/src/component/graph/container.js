import ContainerBase from "./containerbase";
import Grip from "./grip";
import NodeBase from "./nodebase";

export default class Container extends ContainerBase {
    constructor(refrence) {
        super(refrence);
        this.OnTapHandler = function () { }
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

    get Nodes() {
        var children = this.Children;
        var result = children.filter(function (node) {
            var isNode = !(node instanceof Grip);
            return isNode;
        });
        return result;
    }

    Append(node) {
        node.Position = this.Position;
        node.Parent = this;
    }

    appendGrip(grip) {
        grip.Position = this.Position;
        grip.Refrence.move({ parent: this.ID });
        grip.OnLoad();
    }

    Expand(width = null, height = null) {
        if (!width) width = this.StartDimention.Width;
        if (!height) height = this.StartDimention.Height;
        var grips = this.Grips;
        var g0 = grips[0];
        g0.Position = this.Position;
        g0.Move((-width / 2) + 3, (-height / 2) + 3);
        var g1 = grips[1];
        g1.Move((width / 2) - 3, (height / 2) - 3);
    }

    OnLoad() {
        var _this = this;
        _this.Style('padding', '5px');
        for (var i = 0; i < 2; i++) {
            var grip = this.Graph.Add(Grip);
            grip.Container = _this;
            grip.Corner = i;
            //grip.Parent = _this;
            _this.appendGrip(grip);
        }

    }
}