import $ from 'jquery';
import CytoExtend from './cytoextend';
import NodeBase from './nodebase';
import ContainerBase from './containerbase';
export default class Graph {

    constructor(id) {
        this.ID = id;
        this.Refrence = null;
        this.OnReady = function () { }
        this.OnBoxHandler = function () { }
        this.OnTapHandler = function () { }
    }

    get Zoomable() { return this.Refrence.zoomingEnabled(); }
    set Zoomable(value) { this.Refrence.zoomingEnabled(value); }

    get UserPanning() { return this.Refrence.userPanningEnabled(); }
    set UserPanning(value) { this.Refrence.userPanningEnabled(value); }

    get UserZooming() { return this.Refrence.userZoomingEnabled(); }
    set UserZooming(value) { this.Refrence.userZoomingEnabled(value); }

    get Nodes() {
        var result = [];
        var cy = this.Refrence;
        var cyNodes = cy.nodes().filter();
        cyNodes.forEach(cyElement => {
            var owner = this.getOwner(cyElement);
            if (owner) result.push(owner);
        });
        return result;
    }

    get Containers() {
        var result = [];
        var nodes = this.Nodes;
        nodes.forEach(node => {
            if (node instanceof ContainerBase) {
                result.push(node);
            }
        });
        return result;
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

    Get(id) {
        var result = id ? this.getOwner(id) : null;
        return result;
    }

    Remove(element) {
        var cy = this.Refrence;
        var cyElement = this.getCyElement(element.ID);
        cy.remove(cyElement);
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
        this.UserZooming = false;

        this.OnReady();
        this.OnBox(function () { });
        this.OnTap(function () { });
    }

    OnBox(callback) {
        var _this = this;
        var refrence = this.Refrence;
        refrence.on('box', function (event) {
            var cyElement = event.target;
            if (cyElement) {
                var id = event.target.id();
                var element = _this.Get(id);
                element.OnBoxHandler(element);
                callback(_this);
            }
        });
    }

    OnTap(callback) {
        var _this = this;
        var refrence = this.Refrence;
        refrence.on('tap', function (event) {
            var element = null;
            if (event.target.length) {
                var id = event.target.id();
                element = _this.Get(id);
            }
            _this.OnTapHandler(element);
            callback(_this);
        });
    }

    PanBy(x, y) {
        this.Refrence.panBy({ x: x, y: y });
    }
}