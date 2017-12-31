import cytoscape from 'cytoscape';
import Node from './node';
import $ from 'jquery';

class MyCS extends cytoscape {
    constructor(value) {
        super(value);
        this.style()._private.coreStyle['selection-box-color'].value = [0, 0, 0];
        this.style()._private.coreStyle['active-bg-size'].pfValue = 0;
    }
}
export default class Graph {

    constructor(id) {
        this.ID = id;
        this.Refrence = null;
    }

    Load() {

        var domElement = document.getElementById(this.ID);

        var cy = new MyCS({ container: domElement });
        // cy.$('core') // just core properties
        //     .css({
        //         'selection-box-color': 'red',
        //         'selection-box-opacity': 0.65,
        //         'selection-box-border-color': '#aaa',
        //         'selection-box-border-width': 1,
        //         'active-bg-color': 'black',
        //         'active-bg-opacity': 0.15,
        //         'active-bg-size': 30,
        //         'outside-texture-bg-color': '#000',
        //         'outside-texture-bg-opacity': 0.125
        //     });
        //cy.boxSelectionEnabled(false);
        cy.on('mousedown', function (evt) {
            // cy.style()._private.coreStyle['selection-box-color'].value=[0, 0,0];
            // console.log(cy.style()._private.coreStyle['selection-box-color']);
            //evt.originalEvent.preventDefault();
            //console.log(evt);
            //evt.originalEvent.preventDefault();
            //console.log(evt.originalEvent);

        });

        // var cy = cytoscape({
        //     container: domElement,
        //     elements: [/* ... */],
        //     options: {
        //         style: [
        //             {
        //                 selector: 'node, edge',
        //                 style: {
        //                     'overlay-opacity': 0,
        //                 },
        //             },
        //         ],
        //     },
        // });

        //cy.autolock(true);

        this.Refrence = cy;
        this.AllowUserPanning = false;
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

    get Zoomable() { return this.Refrence.zoomingEnabled(); }
    set Zoomable(value) { this.Refrence.zoomingEnabled(value); }

    get AllowUserPanning() { return this.Refrence.userPanningEnabled(); }
    set AllowUserPanning(value) { this.Refrence.userPanningEnabled(value); }

}