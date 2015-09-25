const events = require('events');
const _ = require('lodash');

const AppConstants = require('../lib/constants');
const AppDispatcher = require('../dispatchers/app_dispatcher');

const items = [];
function add(item) {
    "use strict";
    items.push(item);
    TweetStore.emit(AppConstants.EVENTS.ADD, item);
    TweetStore.emit(AppConstants.EVENTS.CHANGE, items);
}

function empty() {
    "use strict";
    items.length = 0;
    this.emit(AppConstants.EVENTS.RESET);
    this.emit(AppConstants.EVENTS.CHANGE, items);
}

const TweetStore = new class extends events.EventEmitter {
    get tweets () {
        "use strict";
        return items;
    }
    latest (count) {
        "use strict";
        return items.slice(-count);
    }

};

const ActionHandlers = {
    [AppConstants.ACTIONS.ADD_TWEET]: (data) => {
        "use strict";
        add(data);
    },
    [AppConstants.ACTIONS.CLEAR_TWEETS]: () => {
        "use strict";
        empty();
    }
};

AppDispatcher.register((payload) => {
    "use strict";
    if(typeof ActionHandlers[payload.action.actionType] === "function") {
        ActionHandlers[payload.action.actionType](payload.action.data);
    }

    return true;
});

module.exports = TweetStore;