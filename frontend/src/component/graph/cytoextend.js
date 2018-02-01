import $ from 'jquery';
import cytoscape from './cytoscape.cjs.js';

export default class CytoExtend extends cytoscape {
    constructor(id) {
        super({
            container: $('#' + id),
            zoom: 1,
            pan: {
                x: 0,
                y: 0
            },
            style: [{
                    selector: 'node',
                    style: {
                        'overlay-opacity': '0'
                    }
                },
                {
                    selector: '.collection',
                    style: {
                        'background-color': '#eff0f2',
                        'border-color': '#cccccc',
                        'border-width': '1'
                    }
                },
                {
                    selector: '.collection:selected',
                    style: {
                        'background-color': '#d9e8f9',
                        'border-color': '#0083ff',
                        'border-width': '1'
                    }
                },
                {
                    selector: '.alternative',
                    style: {
                        'content': 'data(label)',
                        'text-valign': 'center',
                        'text-halign': 'center',
                        'font-size': '14px',
                        'color': 'white',
                        'background-color': '#5b6366'
                    }
                },
                {
                    selector: '.alternative:selected',
                    style: {
                        'border-color': '#fc5f05',
                        'border-width': '3'
                    }
                },
                {
                    selector: '.independent',
                    style: {
                        'font-size': '10px',
                        "text-wrap": "wrap",
                        'background-color': '#696d70'
                    }
                },
                {
                    selector: '.dependent',
                    style: {
                        'font-size': '10px',
                        "text-wrap": "wrap",
                        'background-color': '#9eaeb2'
                    }
                },
                {
                    selector: '.generator',
                    style: {
                        'background-color': '#e8bb68'
                    }
                },
                {
                    selector: '.child-independent',
                    style: {
                        'background-color': '#70d185'
                    }
                },
                {
                    selector: '.child-dependent',
                    style: {
                        'background-color': '#dabcf4'
                    }
                }
            ],
        });
        this.style()._private.coreStyle['active-bg-size'].pfValue = 0;
    }
}