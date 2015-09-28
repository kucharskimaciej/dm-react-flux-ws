import React from 'react';
import ApplicationComponent from './components/application.jsx';

console.log(React, React.render);

React.render(
    <ApplicationComponent />,
    document.body
);

require('./lib/tweet_stream');
