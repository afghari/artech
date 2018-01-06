import cytoscape from './cytoscape.cjs.js';

export default class CytoExtend extends cytoscape {
    constructor(value) {
        super(value);
        this.style()._private.coreStyle['active-bg-size'].pfValue = 0;
    }
}