import Alternative from "./alternative";
import Point from "../graph/point";
import CollectionBase from "./collectionbase";

export default class Collection extends CollectionBase {

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

    get Alternatives() {
        return super.Nodes;
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
        var pos = this.Position;
        this.Position = new Point(0, 0);
        this.Position = pos;
    }

    OnLoad() {
        super.OnLoad();
        this.Class('collection');
        this.Selectable = false;
        this.registerOnBoxHandler();
        this.registerOnTap();
        this.registerOnDragAndDrop();
    }

    registerOnTap() {
        var _this = this;
        var graph = _this.Graph;
        this.OnTapHandler = function () {
            if (_this.Graph.Modifier1) {
                _this.Selected = false;
            } else {
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


    registerOnDragAndDrop() {
        var _this = this;
        this.OnTapStart(function () {
            _this.Selected = true;
            var graph = _this.Graph;
            if (graph.Modifier2 || graph.Modifier3) {
                graph.BoxSelectionEnabled = false;
                var collections = graph.SelectedItems.Collections;
                collections.forEach(collection => {
                    collection.Selected = true;
                    collection.PreviousPosition = collection.Position;
                });
            }
            else if(graph.Modifier1)
            {
                graph.SelectedItems.Unselect();
                _this.Alternatives.forEach(function(alternative)
                {
                    alternative.Selected=true;
                });
            }
        });

        this.OnTapEnd(function () {

            var graph = _this.Graph;
            if (graph.Modifier3) {
                var collections = graph.SelectedItems.Collections;
                var alternatives = [];
                collections.forEach(collection => {
                    collection.Alternatives.forEach(alternative => {
                        alternatives.push(alternative);
                    });
                });

                var collection = graph.Add(Collection);
                collection.Position = _this.Position;
                collection.Expand();
                alternatives.forEach(function (alternative) {
                    //var a = graph.Add(Alternative);
                    var newAlternative = alternative.Clone();
                    graph.Push(newAlternative);
                    collection.Append(newAlternative);
                });
                collection.Makeup();

                collections.forEach(collection => {
                    collection.Position = collection.PreviousPosition;
                });
                graph.SelectedItems.Unselect();

            } else if (graph.Modifier2) {

                var collections = graph.SelectedItems.Collections;
                var alternatives = [];
                collections.forEach(collection => {
                    collection.Alternatives.forEach(alternative => {
                        alternatives.push(alternative);
                    });
                });

                var pos = graph.MousePosition;
                var targetCollection = graph.Collections.filter(e =>
                    (e.Selected == false && e.IsOnPoint(pos))
                )[0];
                if (targetCollection) {
                    //console.log(targetCollection);
                    alternatives.forEach(alternative => {
                        var newAlternative = alternative.Clone();
                        graph.Push(newAlternative);
                        //var newAlternative = graph.Add(Alternative);
                        targetCollection.Append(newAlternative);
                    });
                    targetCollection.Makeup();
                }

                collections.forEach(collection => {
                    collection.Position = collection.PreviousPosition;
                });
                graph.SelectedItems.Unselect();
            }
            graph.BoxSelectionEnabled = true;
        });
    }


}