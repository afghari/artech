import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import registerServiceWorker from './js/registerServiceWorker';

var a=new Date();
var b=a.getTime();
ReactDOM.render(<div>
    {b}
</div>, document.getElementById('root'));
registerServiceWorker();
