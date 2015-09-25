const AppConstants = require('../lib/constants');
const AppDispatcher = require('../dispatchers/app_dispatcher');

module.exports = {
    connected: function () {
        "use strict";
        AppDispatcher.handleServerAction({
            actionType: AppConstants.ACTIONS.CONNECTED_TO_SERVER,
            data: {}
        });
    },
    disconnected: function () {
        "use strict";
        AppDispatcher.handleServerAction({
            actionType: AppConstants.ACTIONS.DISCONNECTED_FROM_SERVER,
            data: {}
        });
    }
};