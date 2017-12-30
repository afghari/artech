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
        cy.Owner = this;
    }


    Get(uID) {
        var result = this.Refrence.$('#' + uID)[0];
        return result;
    }

    Add(type) {
        var result = null;
        var cy = this.Refrence;
        if (type.name === Node.name || type.prototype instanceof Node) {
            var refrence = cy.add({ groups: "node" })[0];
            result = new type(refrence);
        }
        else {
            console.log(type.Refrence.id());
            cy.add(type.Refrence.data());
        }
        return result;
    }

    get Zoomable() {
        var cy = this.Refrence;
        var result = cy.zoomingEnabled();
        return result;
    }

    set Zoomable(value) {
        var cy = this.Refrence;
        cy.zoomingEnabled(value);
    }



}