const events = require('events');
const _ = require('lodash');

const AppConstants = require('../lib/constants');
const AppDispatcher = require('../dispatchers/app_dispatcher');

const TweetStore = new class extends events.EventEmitter {
    constructor () {
        "use strict";
        super();
        this.items = [];
    }

    empty () {
        "use strict";
        this.items.length = 0;
        this.emit(AppConstants.EVENTS.RESET);
        this.emit(AppConstants.EVENTS.CHANGE, this.items);
    }

    add (item) {
        "use strict";
        this.items.unshift(item);
        this.emit(AppConstants.EVENTS.ADD, item);
        this.emit(AppConstants.EVENTS.CHANGE, this.items);
    }

};

const ActionHandlers = {
    [AppConstants.ACTIONS.ADD_TWEET]: (data) => {
        "use strict";
        console.log("in action map: ", data);
        TweetStore.add(data);
    },
    [AppConstants.ACTIONS.CLEAR_TWEETS]: () => {
        "use strict";
        TweetStore.empty();
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