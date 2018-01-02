import ContainerBase from "./containerbase";
import Grip from "./grip";
import Point from "./point";

export default class Container extends ContainerBase {
    constructor(refrence) {
        super(refrence);
        this.StartSize = 200;
    }

    Append(nodeBase) {
        nodeBase.Position = this.Position;
        nodeBase.Refrence.move({ parent: this.ID });
        nodeBase.OnLoad();
    }

    get Children() {
        this.Refrence.children();
    }

    OnLoad() {
        for (var i = 0; i < 2; i++) {
            var grip = this.Graph.Add(Grip);
            grip.Container = this;
            grip.Corner = i;
            this.Append(grip);
            grip.OnLoad();
            if (i === 0) grip.Position = new Point(0, 0);
            else if (i === 1) grip.Position = new Point(this.StartSize, this.StartSize);
        }
    }
}