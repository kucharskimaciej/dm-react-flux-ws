const React = require('react');


const Tweet = React.createClass({
    get propTypes() {
        "use strict";
        return {
            user: React.PropTypes.any.isRequired,
            text: React.PropTypes.string.isRequired
        };
    },

    render: function() {
        "use strict";
        let {user: { name }, text} = this.props;
        return (
            <article className="tweet">
                <header className="tweet__header">{ name } says...</header>
                <p className="tweet__body">{ text }</p>
            </article>
        );
    }
});

module.exports = Tweet;