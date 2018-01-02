import Container from "../graph/container";

export default class Collection extends Container {
    // constructor(refrence) {
    //     super(refrence);
    // }

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
        //this.Selectable = false;
    }
}