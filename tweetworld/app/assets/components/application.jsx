const React = require('react');

let Tweet = require('./list/tweet.jsx');

module.exports = React.createClass({
    render: () => {
        "use strict";
        var user = {
            name: "maciej"
        };
        return (
            <div>
                <h1>Application</h1>
                <Tweet text="hello" user={user} />
            </div>
        );
    }
});