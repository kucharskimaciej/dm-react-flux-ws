import _ from 'lodash';
import { EventEmitter } from 'events';

import { ACTIONS, EVENTS } from '../lib/constants';
import Dispatcher from '../dispatchers/app_dispatcher';

const status = {
    connected: false
};


const StatusStore = new class extends EventEmitter {
    get isConnected() {
        "use strict";
        return status.connected;
    }
};

const ActionHandlers = {
    [ACTIONS.CONNECTED_TO_SERVER]: () => {
        "use strict";
        console.log("connected");
        status.connected = true;
        StatusStore.emit(EVENTS.CHANGE);
    },
    [ACTIONS.DISCONNECTED_FROM_SERVER]: () => {
        "use strict";
        status.connected = false;
        StatusStore.emit(EVENTS.CHANGE);
    }
};

Dispatcher.register((payload) => {
    "use strict";
    if (typeof ActionHandlers[payload.action.actionType] === "function") {
        ActionHandlers[payload.action.actionType](payload.action.data);
    }

    return true;
});

export default StatusStore;