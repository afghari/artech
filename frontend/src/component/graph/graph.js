import cytoscape from 'cytoscape';
import Node from './node';

export default class Graph {

    constructor(id) {
        this.ID = id;
        this.Refrence = null;
    }

    Load() {
        var domElement = document.getElementById(this.ID);
        var cy = new cytoscape({ container: domElement });
        this.Refrence = cy;
    }

    Add(type) {
        var result = null;
        if (type.name === Node.name || type.prototype instanceof Node) {
            var cy = this.Refrence;
            var refrence = cy.add({ groups: "node" })[0];
            result = new type(refrence);
        }
        return result;
    }

    get AllowZoom() {
        var cy = this.Refrence;
        var result = cy.zoomingEnabled();
        return result;
    }

    set AllowZoom(value) {
        var cy = this.Refrence;
        cy.zoomingEnabled(value);
    }



}