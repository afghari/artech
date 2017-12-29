import React from 'react';
import ReactDOM from 'react-dom';
import Graph from './component/Graph';
import registerServiceWorker from './js/registerServiceWorker';
import './css/style.css';

// function test(value) {
//     console.log('test ' + value);
// }
//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    //onNvEvent={test}
    <Graph id="cy" a="aa" />
    , document.getElementById('root'));
registerServiceWorker();
