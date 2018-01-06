import Node from "../graph/node";

export default class AlternativeBase extends Node {

    constructor(refrence) {
        super(refrence);
        this.OnSelfTapStartHandler = function () { };
        this.OnSelfTapEndHandler = function () { };
    }

    get Selected() {
        return super.Selected;
    }
    set Selected(value) {
        this.Selectable = true;
        super.Selected = value;
        this.Selectable = false;
    }


    OnLoad() {
        super.OnLoad();
        this.Selectable = false;
        this.OnSelfTapStart(function () { });
        this.OnSelfTapEnd(function () { });
    }

    OnSelfTapStart(callback) {
        var _this = this;
        this.OnTapStartHandler = function () {
            var isSelfDragged = _this.Active || _this.Selected;
            if (isSelfDragged) {
                _this.OnSelfTapStartHandler();
                callback(_this);
            }
        }
    }

    OnSelfTapEnd(callback) {
        var _this = this;
        this.OnTapEndHandler = function () {
            var isSelfFree = !_this.Parent || !_this.Parent.Grabbed;
            if (isSelfFree) {
                _this.OnSelfTapEndHandler();
                callback(_this);
            }
        }
    }

}