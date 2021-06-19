import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

const params = location.search ? JSON.parse(decodeURIComponent(location.search.substr(1))) : {};

ReactDOM.render(
    <App {...params} />,
    document.getElementById('root')
);
