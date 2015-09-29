import {ACTIONS} from '../lib/constants.js';
import AppDispatcher from '../dispatchers/app_dispatcher.js';

module.exports = {
    connected: function () {
        "use strict";
        AppDispatcher.handleServerAction({
            actionType: ACTIONS.CONNECTED_TO_SERVER,
            data: {}
        });
    },
    disconnected: function () {
        "use strict";
        AppDispatcher.handleServerAction({
            actionType: ACTIONS.DISCONNECTED_FROM_SERVER,
            data: {}
        });
    }
};