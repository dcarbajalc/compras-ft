import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import {BrowserRouter} from 'react-router-dom';
import 'uikit/dist/css/uikit.min.css';
// loads the Icon plugin
UIkit.use(Icons);

const WithRouter = () => (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

ReactDOM.render(<WithRouter />, document.getElementById('root'));

serviceWorker.unregister();