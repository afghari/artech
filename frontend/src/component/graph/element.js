export default class Element {
    constructor() {
        this.Graph = null;
        this.ID = null;
    }

    Style(name, value = null) {
        if (!value) return this.Refrence.style(name);
        else this.Refrence.style(name, value);
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

    OnLoad() {

    }
}