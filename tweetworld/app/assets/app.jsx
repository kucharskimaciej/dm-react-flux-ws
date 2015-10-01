import React from 'react';
import ApplicationComponent from './components/application.jsx';
require('normalize.css');
require('./styles/app.styl');

React.render(
    <ApplicationComponent/>,
    document.body
);

require('./lib/tweet_stream');
