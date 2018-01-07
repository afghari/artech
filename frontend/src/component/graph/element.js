export default class Element {

    constructor() {
        this.Graph = null;
        this.ID = null;
        this.OnDragHandler = function () { }
        this.OnBoxHandler = function () { }
        this.OnTapHandler = function () { }
        this.OnTapStartHandler = function () { }
        this.OnTapEndHandler = function () { }
        this.OnDragHandler = function () { }
        this.OnFreeHandler = function () { }
        this.OnGrabOnHandler = function () { }
        this.OnMouseOverHandler = function () { }
        this.OnMouseOutHandler = function () { }
    }

    Style(name, value = null) {
        if (!value) return this.Refrence.style(name);
        else this.Refrence.style(name, value);
    }

    Class(name, value = null) { this.Refrence.addClass(name); }
    UnClass(name) { this.Refrence.removeClass(name); }

    Data(name, value = null) {
        if (!value) return this.Refrence.data(name);
        else this.Refrence.data(name, value);
    }

    get Refrence() {
        var cy = this.Graph.Refrence;
        var result = cy.$('#' + this.ID)[0];
        return result;
    }

    get Selectable() { return this.Refrence.selectable(); }
    set Selectable(value) { if (value) this.Refrence.selectify(); else this.Refrence.unselectify(); }

    get Grabbable() { return this.Refrence.grabbable(); }
    set Grabbable(value) { if (value) this.Refrence.grabify(); else this.Refrence.ungrabify(); }
    get Grabbed() { return this.Refrence.grabbed(); }


    get Selected() { return this.Refrence.selected(); }
    set Selected(value) { if (value) this.Refrence.select(); else this.Refrence.unselect(); }

    get Active() { return this.Refrence.active(); }

    OnLoad() {
        this.OnMove(function () { });
        this.OnTap(function () { });
        this.OnTapStart(function () { });
        this.OnTapEnd(function () { });
        this.OnDrag(function () { });
        this.OnFree(function () { });
        this.OnGrabOn(function () { });
        this.OnMouseOver(function () { });
        this.OnMouseOut(function () { });
    }

    OnMove(callback) {
        var _this = this;
        var refrence = this.Refrence;
        refrence.on('position', function () {
            _this.OnDragHandler();
            callback(_this);
        });
    }

    OnTap(callback) {
        var _this = this;
        var refrence = this.Refrence;
        refrence.on('tap', function () {
            _this.OnTapHandler();
            callback(_this);
        });
    }

    OnTapStart(callback) {
        var _this = this;
        var refrence = this.Refrence;
        refrence.on('tapstart', function () {
            _this.OnTapStartHandler();
            callback(_this);
        });
    }

    OnTapEnd(callback) {
        var _this = this;
        var refrence = this.Refrence;
        refrence.on('tapend', function () {
            _this.OnTapEndHandler();
            callback(_this);
        });
    }

    OnDrag(callback) {
        var _this = this;
        var refrence = this.Refrence;
        refrence.on('drag', function () {
            _this.OnDragHandler();
            callback(_this);
        });
    }

    OnFree(callback) {
        var _this = this;
        var refrence = this.Refrence;
        refrence.on('free', function () {
            _this.OnFreeHandler();
            callback(_this);
        });
    }

    OnGrabOn(callback) {
        var _this = this;
        var refrence = this.Refrence;
        refrence.on('grabon', function () {
            _this.OnGrabOnHandler();
            callback(_this);
        });
    }

    OnMouseOver(callback) {
        var _this = this;
        var refrence = this.Refrence;
        refrence.on('mouseover', function () {
            _this.OnMouseOverHandler();
            callback(_this);
        });
    }

    OnMouseOut(callback) {
        var _this = this;
        var refrence = this.Refrence;
        refrence.on('mouseout', function () {
            _this.OnMouseOutHandler();
            callback(_this);
        });
    }
}