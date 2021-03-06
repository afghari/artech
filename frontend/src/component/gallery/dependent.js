import AlternativeChild from "./alternativechild";

export default class Dependent extends AlternativeChild {

    constructor() {
        super();
    }

    OnLoad() {
        super.OnLoad();
        this.Class('dependent');
    }

    HandleLabel() {
        this.Generator.DependentIndex++;
        var index = this.Generator.DependentIndex;
        var label = this.Generator.Data('label');
        this.Data('label', label + "\n    " + index);
    }
}