import Element from './element';
export default class NodeBase extends Element {
    // constructor() {
    //     super();
    // }

    OnMove(callback)
    {
        var _this=this;
        var refrence=this.Refrence;
        refrence.on('position',function()
        {
            callback(_this);
        });
    }

}
