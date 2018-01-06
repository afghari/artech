import $ from 'jquery';
import Graph from "../graph/graph";
import Alternative from './alternative';
import Collection from './collection';

export default class Gallery extends Graph {

    constructor(id) {
        super(id);
        this._modifier1 = false;
        this._modifier2 = false;
        this._modifier3 = false;
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

    OnLoad() {
        super.OnLoad();
        this.setGalleryHeight();
        this.registerModifiers();
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


}