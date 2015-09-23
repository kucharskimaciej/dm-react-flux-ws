const AppConstants = require('../lib/constants');
const AppDispatcher = require('../dispatchers/app_dispatcher');

module.exports = {
    add: function (tweet) {
        "use strict";
        AppDispatcher.handleServerAction({
            actionType: AppConstants.ACTIONS.ADD_TWEET,
            data: tweet
        });
    },
    clear: function () {
        "use strict";
        AppDispatcher.handleViewAction({
            actionType: AppConstants.ACTIONS.CLEAR_TWEETS,
            data: {}
        });
    }
};