export default class Element {
    constructor() {
        this.Graph = null;
        this.ID = null;
        this.OnMoveHandler = function () { }
        this.OnBoxHandler = function () { }
        this.OnTapHandler = function () { }
        this.OnDragHandler = function () { }
        this.OnGrabOnHandler = function () { }
    }

    Style(name, value = null) {
        if (!value) return this.Refrence.style(name);
        else this.Refrence.style(name, value);
    }

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

    get Selected() { return this.Refrence.selected(); }
    set Selected(value) { if (value) this.Refrence.select(); else this.Refrence.unselect(); }

    OnLoad() {
        this.OnMove(function () { });
        this.OnBox(function () { });
        this.OnTap(function () { });
        this.OnDrag(function () { });
        this.OnGrabOn(function () { });
    }

    OnMove(callback) {
        var _this = this;
        var refrence = this.Refrence;
        refrence.on('position', function () {
            _this.OnMoveHandler();
            callback(_this);
        });
    }

    OnBox(callback) {
        var _this = this;
        var refrence = this.Refrence;
        refrence.on('box', function () {
            _this.OnBoxHandler();
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

    OnDrag(callback) {
        var _this = this;
        var refrence = this.Refrence;
        refrence.on('drag', function () {
            _this.OnDragHandler();
            callback(_this);
        });
    }

    OnGrabOn(callback) {
        var _this = this;
        var refrence = this.Refrence;
        refrence.on('grab', function () {
            _this.OnGrabOnHandler();
            callback(_this);
        });
    }
}