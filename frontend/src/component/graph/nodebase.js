import Element from './element';
export default class NodeBase extends Element {
    // constructor() {
    //     super();
    // }

    get Parent() {
        var parentID = this.Data('parent');
        var result = this.Graph.Get(parentID);
        return result;
    }

    set Parent(element) {
        var parentID =element ? element.ID : null;
        this.Refrence.move({ parent: parentID });
        this.OnLoad();
    }
}
