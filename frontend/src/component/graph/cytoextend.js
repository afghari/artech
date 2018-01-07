import $ from 'jquery';
import cytoscape from './cytoscape.cjs.js';

export default class CytoExtend extends cytoscape {
    constructor(id) {
        super({
            container: $('#' + id),
            zoom: 1,
            pan: { x: 0, y: 0 },
            style: [
                { selector: 'node', style: { 'overlay-opacity': '0' } },
                { selector: '.collection', style: { 'background-color': '#eff0f2', 'border-color': '#cccccc', 'border-width': '1' } },
                { selector: '.collection:selected', style: { 'background-color': '#d9e8f9', 'border-color': '#0083ff', 'border-width': '1' } },
                { selector: '.alternative', style: { 'background-color': '#5b6366' } },
                { selector: '.alternative:selected', style: { 'border-color': '#fc5f05', 'border-width': '3' } },
                { selector: '.dependent', style: { 'background-color': '#9eaeb2' } },
                { selector: '.notice', style: { 'background-color': '#b774f2' } }

            ],
        });
        this.style()._private.coreStyle['active-bg-size'].pfValue = 0;
    }
}