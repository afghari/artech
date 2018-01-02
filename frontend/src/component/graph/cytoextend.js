import cytoscape from 'cytoscape';
//import cytoscape from './cytoscape';

export default class CytoExtend extends cytoscape {
    constructor(value) {
        super(value);
        //this.style()._private.coreStyle['selection-box-color'].value = [0, 0, 0];
        this.style()._private.coreStyle['active-bg-size'].pfValue = 0;
        //this.style()._private.coreStyle['outside-texture-bg-color'].value = [255, 0, 0];
        
        //this.style()._private.coreStyle['active-bg-opacity'].pfValue = 0;
        //this.style()._private.coreStyle['selection-box-border-width'].value=300;
    }

    // on()
    // {
    //     //super.on()
    // }
}