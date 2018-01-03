import $ from 'jquery';
import CytoExtend from './cytoextend';
import NodeBase from './nodebase';
export default class Graph {

    constructor(id) {
        this.ID = id;
        this.Refrence = null;
        this.OnReady = function () { }
        this.OnTapHandler = function () { }
    }

    OnLoad() {
        var cy = new CytoExtend({
            container: $('#' + this.ID),
            zoom: 1,
            pan: { x: 0, y: 0 },
            style: [{ selector: 'node', style: { 'overlay-opacity': '0' } }],
            //autolock: true,
        });
        this.Refrence = cy;
        this.UserPanning = false;
        this.OnReady();
        this.OnTap(function () { });
    }

    Add(type, id = null) {
        var cy = this.Refrence;
        var result = new type();
        result.Graph = this;
        result.ID = id;
        if (type.prototype instanceof NodeBase) {
            var data = id ? { id: id, owner: result } : { owner: result };
            var cyNode = cy.add({ groups: "node", data: data });
            result.ID = cyNode.id();
        }
        if (result) result.OnLoad();
        return result;
    }

    AddByData(data)
    {
        var cy = this.Refrence;
        var cyNode = cy.add(data);
        return cyNode;
    }


    get Zoomable() { return this.Refrence.zoomingEnabled(); }
    set Zoomable(value) { this.Refrence.zoomingEnabled(value); }

    get UserPanning() { return this.Refrence.userPanningEnabled(); }
    set UserPanning(value) { this.Refrence.userPanningEnabled(value); }

    OnTap(callback) {
        var _this = this;
        var refrence = this.Refrence;
        refrence.on('tap', function () {
            _this.OnTapHandler();
            callback(_this);
        });
    }

    getCyElement(id) {
        var result = this.Refrence.getElementById(id);
        return result;
    }

    getOwner(input) {
        var cyElement = typeof input === "string" ? this.getCyElement(input) : input;
        var result = cyElement.data('owner');
        return result;
    }

    Get(id) {
        var result = id ? this.getOwner(id) : null;
        return result;
    }

    Remove(element) {
        var cy = this.Refrence;
        var cyElement = this.getCyElement(element.ID);
        cy.remove(cyElement);
    }

    get Nodes() {
        var result = [];
        var cy = this.Refrence;
        var cyNodes = cy.nodes().filter();
        cyNodes.forEach(cyElement => {
            //var owner = cy.GetOwner(cyElement);
            var owner = this.getOwner(cyElement);
            if (owner) result.push(owner);
        });
        return result;
    }


}