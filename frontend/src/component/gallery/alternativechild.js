import Alternative from "./alternative";

export default class AlternativeChild extends Alternative {

    constructor() {
        super();
        this.Generator = null;
    }


    Clone()
    {
        var result=super.Clone();
        result.Generator = this.Generator;
        return result;
    }
}