import React from 'react';
import ApplicationComponent from './components/application.jsx';
require('normalize.css');

React.render(
    <ApplicationComponent/>,
    document.body
);

require('./lib/tweet_stream');
