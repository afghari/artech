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
                graph.Alternatives.forEach(function (a) {
                    a.Selected = false;
                });
                _this.Selected = true;
            } else if (graph.Modifier1) {
                _this.Selected = false;
            } else if (graph.Modifier3) {

            } else {
                //if (_this.Selected === false) _this.Selected = true;
                //_this.Selected = !_this.Selected;
                _this.Selected = true;
            }
        }
    }

    registerOnSelfDragAndDrop() {
        var _this = this;
        var graph = _this.Graph;

        this.OnSelfTapStartHandler = function () {

            _this.Selected = true;
            var alternatives = _this.Graph.SelectedItems.Alternatives;

            if (graph.Modifier1) {
                graph.BoxSelectionEnabled = false;
                alternatives.forEach(alternative => {
                    alternative.Parent = null;
                });
            } else {
                alternatives.forEach(alternative => {
                    alternative.PreviousPosition = alternative.Position;
                });
            }
        }

        this.OnSelfTapEndHandler = function () {

            var containers = _this.Graph.Containers;
            var alternatives = _this.Graph.SelectedItems.Alternatives;

            if (graph.Modifier1) {
                graph.BoxSelectionEnabled = true;
                containers.forEach(container => {
                    if (_this.IsOn(container)) {
                        alternatives.forEach(alternative => {
                            alternative.Parent = container;
                            //console.log(alternative.PreviousPosition);
                        });
                    }
                });
            } else {


                alternatives.forEach(alternative => {

                    var isOnGallery = true;
                    var hasNewParent = false;

                    containers.forEach(container => {
                        if (alternative.IsOn(container)) {
                            isOnGallery = false;
                            if (container != alternative.Parent) {
                                if (alternative.Parent == null) {
                                    hasNewParent = true;
                                    alternative.Parent = container;
                                } else {

                                    var newAlternative = _this.Graph.Add(Alternative);
                                    newAlternative.Position = alternative.Position;
                                    newAlternative.Parent = container;
                                    newAlternative.Selected = true;
                                    alternative.Selected = false;
                                    alternative.Position = alternative.PreviousPosition;
                                }
                            } else {

                            }
                        }
                    });

                    if (!hasNewParent && isOnGallery && alternative.Parent != null) {
                        alternative.Position = alternative.PreviousPosition;
                    }

                });
            }
        }
    }

    registerOnBoxHandler() {
        var _this = this;
        this.OnBoxHandler = function () {
            if (_this.Graph.Modifier1 && _this.Graph.Modifier2) {
                _this.Selected = false;
            } else if (_this.Graph.Modifier2) {
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
                } else {
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
            } else {
                _this.Generator.UnClass('generator');
                var dependents = _this.Generator.Dependents;
                dependents.forEach(function (dependent) {
                    dependent.UnClass('child');
                });
            }
        }
    }
}