import Alternative from "./alternative";

export default class Dependent extends Alternative {

    constructor(refrence) {
        super(refrence);
        this.Generator = null;
    }

    OnLoad() {
        super.OnLoad();
        this.Class('dependent');
    }
}