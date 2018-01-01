import $ from 'jquery';
import CytoExtend from './cytoextend';
import NodeBase from './nodebase';
export default class Graph {

    constructor(id) {
        this.ID = id;
        this.Refrence = null;
        this.Ready = function () { }
    }

    Load() {
        var cy = new CytoExtend({ container: $('#' + this.ID) });
        this.Refrence = cy;
        this.UserPanning = false;
        this.Ready();
    }

    Add(type, id = null) {
        var cy = this.Refrence;
        var result = new type();
        result.Graph = this;
        result.ID = id;
        if (type.prototype instanceof NodeBase) {
            var data = id ? { id: id } : {};
            var cyNode = cy.add({ groups: "node", data: data });
            result.ID = cyNode.id();
        }
        if (result) result.OnLoad();
        return result;
    }

    get Zoomable() { return this.Refrence.zoomingEnabled(); }
    set Zoomable(value) { this.Refrence.zoomingEnabled(value); }

    get UserPanning() { return this.Refrence.userPanningEnabled(); }
    set UserPanning(value) { this.Refrence.userPanningEnabled(value); }

}