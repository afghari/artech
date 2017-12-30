export default class Element {

    constructor(refrence) {
        this.Refrence = refrence;
        this.OnBeforeMove = function (sender) { };
        this.OnMove = function (sender) { };
        this.OnAfterMove = function (sender) { };

        var element = this;
        this.Refrence.on('position', function (event) {
            element.OnBeforeMove(element);
            element.OnMove(element);
            element.OnAfterMove(element);
        });

        this.OnDrag = function (sender) { };
        this.Refrence.on('tapstart', function (event) {
            element.OnDrag(element);
        });

        this.OnDrop = function (sender) { };
        this.Refrence.on('tapend', function (event) {
            element.OnDrop(element);
        });
    }

    get Graph() {
        var result = this.Refrence.cy().Owner;
        return result;
    }

    get UID() {
        var result = this.Refrence.id();
        return result;
    }
}