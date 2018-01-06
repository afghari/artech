import AlternativeBase from "./alternativebase";

export default class Alternative extends AlternativeBase {

    // constructor(refrence) {
    //     super(refrence);
    // }

    OnLoad() {
        super.OnLoad();
        this.registerOnTap();
        this.registerOnSelfDragAndDrop();
        this.registerOnBoxHandler();
    }

    registerOnTap() {
        var _this = this;
        var graph = _this.Graph;
        this.OnTapHandler = function () {

            if (graph.Modifier1 && graph.Modifier2) {
                graph.Alternatives.forEach(function (a) { a.Selected = false; });
                _this.Selected = true;
            }
            else if (graph.Modifier1) {
                _this.Selected = false;
            }
            else if (graph.Modifier3) {

            }
            else {
                //if (_this.Selected === false) _this.Selected = true;
                _this.Selected = !_this.Selected;
            }
        }
    }

    registerOnSelfDragAndDrop() {
        var _this = this;
        //var parent = this.Parent;

        this.OnSelfTapStartHandler = function () {
            _this.Parent = null;
        }

        this.OnSelfTapEndHandler = function () {
            var containers = _this.Graph.Containers;
            containers.forEach(container => {
                //_this.Parent = _this.IsOn(container) ? container : null;
                if (_this.IsOn(container)) {
                    _this.Parent = container;
                    //console.log(container.ID);
                }
            });
        }
    }

    registerOnBoxHandler() {
        var _this = this;
        this.OnBoxHandler = function () {
            if (_this.Graph.Modifier1 && _this.Graph.Modifier2) {
                _this.Selected = false;
            }
            else if (_this.Graph.Modifier2) {
                _this.Selected = true;
            }
        }
    }
}