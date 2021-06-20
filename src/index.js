import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

// convert url parameters to props and pass it to `App` if any
const params = location.search ? JSON.parse(decodeURIComponent(location.search.substr(1))) : {};

ReactDOM.render(
    <App {...params} />,
    document.getElementById('root')
);
