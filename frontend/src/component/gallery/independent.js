import AlternativeChild from "./alternativechild";

export default class Independent extends AlternativeChild {

    constructor() {
        super();
    }

    OnLoad() {
        super.OnLoad();
        this.Class('independent');
    }

    HandleLabel() {
        this.Generator.IndependentIndex++;
        var index = this.Generator.IndependentIndex;
        var label = this.Generator.Data('label');
        this.Data('label', label + "\n    " + index);
    }
}