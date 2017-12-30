export default class ElementStyle {
    constructor(owner) {
        this.Owner = owner;
    }

    get(name) { return this.Owner.Refrence.style(name); }
    set(name, value) { this.Owner.Refrence.style(name, value) }

    Css(name, value) {
        if (!value) return this.get(name);
        else this.set(name, value)
    }

}