import {ACTIONS} from '../lib/constants.js';
import AppDispatcher from '../dispatchers/app_dispatcher.js';

export default {
    add: function (tweet) {
        "use strict";
        AppDispatcher.handleServerAction({
            actionType: ACTIONS.ADD_TWEET,
            data: tweet
        });
    },
    clear: function () {
        "use strict";
        AppDispatcher.handleViewAction({
            actionType: ACTIONS.CLEAR_TWEETS,
            data: {}
        });
    }
};