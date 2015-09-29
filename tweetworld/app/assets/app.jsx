import React from 'react';
import ApplicationComponent from './components/application.jsx';

React.render(
    <ApplicationComponent />,
    document.body
);

require('./lib/tweet_stream');
