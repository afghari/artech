import $ from 'jquery';
import Graph from "../graph/graph";
import Alternative from './alternative';
import Collection from './collection';
import Point from '../graph/point';

export default class Gallery extends Graph {

    constructor(id) {
        super(id);
        this._modifier1 = false;
        this._modifier2 = false;
        this._modifier3 = false;
    }

    get Modifier1() { return this._modifier1; }
    get Modifier2() { return this._modifier2; }
    get Modifier3() { return this._modifier3; }

    get Alternatives() {
        var nodes = this.Nodes;
        var result = nodes.filter(function (node) {
            var isAlternative = node instanceof Alternative;
            return isAlternative;
        });
        return result;
    }

    get Collections() { return super.Containers; }

    get SelectedItems() {
        var result = new GallerySelectedItems(this);
        return result;
    }

    OnLoad() {
        super.OnLoad();
        this.setGalleryHeight();
        this.registerModifiers();
        this.registerMiddleClick();
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

    registerModifiers() {
        var _this = this;
        $(window).on('keyup keydown', function (e) {
            _this._modifier1 = e.shiftKey;
            _this._modifier2 = e.altKey;
            _this._modifier3 = e.ctrlKey;
            e.preventDefault();
        });
    }

    registerMiddleClick() {
        var _this = this;
        var elementID = '#' + _this.ID;
        var middleClick = false;

        $(window).on('mousedown', function (e) {
            if (e.which === 2) {
                $(elementID).css('cursor', 'move');
                middleClick = true;
                e.preventDefault();
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
                lastPos = { x: e.clientX, y: e.clientY }
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
                }
                else if (_this.Modifier1) {
                    _this.Collections.forEach(function (collection) {
                        collection.Selected = false;
                    });
                }
            }
            else {
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
                _this.createMergedCollection(location);
            }
            else { }
        }
    }

    createMergedCollection(location) {
        var newCollection = this.Add(Collection);
        newCollection.Position = location;
        newCollection.Expand();
        if (this.SelectedItems.Collections.length > 0) {
            var selectedCollections = this.SelectedItems.Collections;
            selectedCollections.forEach(selectedCollection => {
                var alternatives = selectedCollection.Alternatives;
                alternatives.forEach(alternative => {
                    newCollection.AppendCopy(alternative);
                });
            });
        }
        newCollection.Makeup();
        newCollection.Selected = true;
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
}