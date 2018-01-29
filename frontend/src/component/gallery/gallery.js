import $ from 'jquery';
import Graph from "../graph/graph";
import Alternative from './alternative';
import Collection from './collection';
import Point from '../graph/point';
import Dependent from './dependent';

export default class Gallery extends Graph {

    constructor(id) {
        super(id);
        this._modifier1 = false;
        this._modifier2 = false;
        this._modifier3 = false;
        this._mousePosition = new Point(-1, -1);
    }

    get Modifier1() {
        return this._modifier1;
    }
    get Modifier2() {
        return this._modifier2;
    }
    get Modifier3() {
        return this._modifier3;
    }

    get MousePosition() {
        return this._mousePosition;
    }

    get Alternatives() {
        var nodes = this.Nodes;
        var result = nodes.filter(function (node) {
            var isAlternative = node instanceof Alternative;
            return isAlternative;
        });
        return result;
    }

    get Collections() {
        return super.Containers;
    }

    get Dependents() {
        var alternatives = this.Alternatives;
        var result = alternatives.filter(function (alternative) {
            var isDependent = alternative instanceof Dependent;
            return isDependent;
        });
        return result;
    }

    get SelectedItems() {
        var result = new GallerySelectedItems(this);
        return result;
    }

    Append(alternative) {
        var independent = !alternative.Generator;
        var result = independent ? this.Add(Alternative) : this.AppendDependent(alternative);
        return result;
    }

    AppendDependent(alternative) {
        var generator = alternative instanceof Dependent ? alternative.Generator : alternative;
        var result = this.Add(Dependent);
        result.Generator = generator;
        return result;
    }

    OnLoad() {
        super.OnLoad();
        this.setGalleryHeight();
        this.registerModifiers();
        this.registerMousePosition();
        this.registerOnClick();
        this.registerDoubleTap();
        this.registerOnTap();
    }

    setGalleryHeight() {
        var _this = this;
        var id = '#' + _this.ID;
        $(window).on('resize load', function (event) {
            var height = $(document).height();
            $(id).height(height);
        });
    }

    registerMousePosition() {
        var _this = this;
        $(window).mousemove(function (event) {
            _this.MousePosition.X = event.pageX;
            _this.MousePosition.Y = event.pageY;
        });
    }

    registerModifiers() {
        var _this = this;
        $(window).on('keyup keydown', function (e) {
            _this._modifier1 = e.shiftKey;
            _this._modifier2 = e.altKey;
            _this._modifier3 = e.ctrlKey;
            e.preventDefault();
        });
    }

    registerOnClick() {
        var _this = this;
        var elementID = '#' + _this.ID;
        var middleClick = false;

        $(window).on('mousedown', function (e) {
            if (e.which === 2) {
                $(elementID).css('cursor', 'move');
                middleClick = true;
                e.preventDefault();
            }
            if (e.which === 3) {
                _this.SelectedItems.Unselect();
            }
        });
        $(window).on('mouseup', function (e) {
            if (e.which === 2) {
                $(elementID).css('cursor', 'default');
                middleClick = false;
                e.preventDefault();
            }
        });

        var lastPos = null;
        $(window).on('mousemove', function (e) {
            if (middleClick) {
                lastPos = {
                    x: e.clientX,
                    y: e.clientY
                }
                setTimeout(() => {
                    var deltaX = lastPos.x - e.clientX;
                    var deltaY = lastPos.y - e.clientY;
                    _this.PanBy(deltaX, deltaY);
                }, 18);
            }
        });
    }

    registerOnTap() {
        var _this = this;
        this.OnTapHandler = function (element) {
            if (!element) {
                if (_this.Modifier1 && _this.Modifier2) {
                    _this.Alternatives.forEach(function (alternative) {
                        alternative.Selected = false;
                    });
                } else if (_this.Modifier1) {
                    _this.Collections.forEach(function (collection) {
                        collection.Selected = false;
                    });
                }
            } else {
                if (element instanceof Collection) {
                    element.OnTapHandler(element);
                }
            }
        }
    }

    registerDoubleTap() {
        var _this = this;
        this.OnDoubleTapHandler = function (element, location) {
            if (!element) {
                if (_this.Modifier2 && _this.Modifier3) {
                    _this.createDependents(location);
                } else if (_this.Modifier2) {
                    _this.createIndependentAlternatives(location);
                } else {
                    _this.createMergedCollection(location);
                }
            } else {}
        }
    }

    createMergedCollection(location) {
        var newCollection = this.Add(Collection);
        newCollection.Position = location;
        newCollection.Expand();
        if (this.SelectedItems.Collections.length > 0) {
            var collections = this.SelectedItems.Collections;
            collections.forEach(collection => {
                var alternatives = collection.Alternatives;
                alternatives.forEach(alternative => {
                    var newAlternative = this.Append(alternative);
                    newCollection.Append(newAlternative);
                });
            });
        }
        newCollection.Makeup();
        newCollection.Selected = true;
    }

    createIndependentAlternatives(location) {
        var newAlternatives = [];
        var alternatives = this.SelectedItems.Alternatives;
        alternatives.forEach(alternative => {
            var newAlternative = this.Append(alternative);
            newAlternatives.push(newAlternative);
        });
        this.Arrange(newAlternatives, location);
    }

    createDependents(location) {
        var newDependents = [];
        var alternatives = this.SelectedItems.Alternatives;
        alternatives.forEach(alternative => {
            var newDependent = this.AppendDependent(alternative);
            newDependents.push(newDependent);
        });
        this.Arrange(newDependents, location);
    }

    Arrange(alternatives, location) {
        var padding = 15;
        var nodeDiameter = 30;
        var currentX = location.X;
        var currentY = location.Y;
        alternatives.forEach(alternative => {
            alternative.Position = new Point(currentX, currentY);
            currentX += nodeDiameter + padding;
        });
    }
}

class GallerySelectedItems {
    constructor(owner) {
        this.Owner = owner;
    }

    get Alternatives() {
        var gallery = this.Owner;
        var alternatives = gallery.Alternatives;
        var result = alternatives.filter(function (alternative) {
            var isSelected = alternative.Selected;
            return isSelected;
        });
        return result;
    }

    get Collections() {
        var gallery = this.Owner;
        var collections = gallery.Collections;
        var result = collections.filter(function (collection) {
            var isSelected = collection.Selected;
            return isSelected;
        });
        return result;
    }

    Unselect() {
        this.UnselectAlternatives();
        this.UnselectCollections();
    }

    UnselectAlternatives() {
        this.Alternatives.forEach((e) => {
            e.Selected = false;
        });
    }

    UnselectCollections() {
        this.Collections.forEach((e) => {
            e.Selected = false;
        });
    }
}