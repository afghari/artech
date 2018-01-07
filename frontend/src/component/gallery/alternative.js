import AlternativeBase from "./alternativebase";

export default class Alternative extends AlternativeBase {

    // constructor(refrence) {
    //     super(refrence);
    // }

    get Dependents() {
        var _this = this;
        var dependents = this.Graph.Dependents;
        var result = dependents.filter(function (dependent) {
            var isGenerator = dependent.Generator.ID == _this.ID;
            return isGenerator;
        });
        return result;
    }

    OnLoad() {
        super.OnLoad();
        this.Class('alternative');
        this.registerOnTap();
        this.registerOnSelfDragAndDrop();
        this.registerOnBoxHandler();
        this.registerOnMouseOverAndOut();
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
                //_this.Selected = !_this.Selected;
                _this.Selected = true;
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

    registerOnMouseOverAndOut() {
        var _this = this;
        var gallery = _this.Graph;
        this.OnMouseOverHandler = function () {
            if (gallery.Modifier3 && !gallery.Modifier2) {
                if (!_this.Generator) {
                    _this.Class('generator');
                    var dependents = _this.Dependents;
                    dependents.forEach(function (dependent) {
                        dependent.Class('child');
                    });
                }
                else {
                    _this.Generator.Class('generator');
                    var dependents = _this.Generator.Dependents;
                    dependents.forEach(function (dependent) {
                        dependent.Class('child');
                    });
                }
            }
        }

        this.OnMouseOutHandler = function () {
            if (!_this.Generator) {
                _this.UnClass('generator');
                var dependents = _this.Dependents;
                dependents.forEach(function (dependent) {
                    dependent.UnClass('child');
                });
            }
            else {
                _this.Generator.UnClass('generator');
                var dependents = _this.Generator.Dependents;
                dependents.forEach(function (dependent) {
                    dependent.UnClass('child');
                });
            }
        }
    }
}