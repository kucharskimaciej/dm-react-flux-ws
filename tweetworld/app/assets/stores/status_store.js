const events = require('events');
const _ = require('lodash');

const AppConstants = require('../lib/constants');
const AppDispatcher = require('../dispatchers/app_dispatcher');

const status = {
    connected: false
};


const StatusStore = new class extends events.EventEmitter {
    get isConnected() {
        "use strict";
        return status.connected;
    }
};

const ActionHandlers = {
    [AppConstants.ACTIONS.CONNECTED_TO_SERVER]: () => {
        "use strict";
        console.log("connected")
        status.connected = true;
        StatusStore.emit(AppConstants.EVENTS.CHANGE);
    },
    [AppConstants.ACTIONS.DISCONNECTED_FROM_SERVER]: () => {
        "use strict";
        status.connected = false;
        StatusStore.emit(AppConstants.EVENTS.CHANGE);
    }
};

AppDispatcher.register((payload) => {
    "use strict";
    if (typeof ActionHandlers[payload.action.actionType] === "function") {
        ActionHandlers[payload.action.actionType](payload.action.data);
    }

    return true;
});

module.exports = StatusStore;