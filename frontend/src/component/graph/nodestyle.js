import ElementStyle from "./elementstyle";

export default class NodeStyle extends ElementStyle {

    get Shape() {
        var result = super.get('shape');
        return result;
    }

    set Shape(value) {
        super.set('shape', value);
    }

}