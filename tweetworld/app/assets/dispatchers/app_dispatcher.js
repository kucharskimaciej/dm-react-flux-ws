import {Dispatcher} from 'flux';
import {ACTION_SOURCES} from "../lib/constants";

export default new class extends Dispatcher {
    handleViewAction(action) {
        "use strict";
        this.handleAction(ACTION_SOURCES.VIEW, action);
    }

    handleServerAction(action) {
        "use strict";
        this.handleAction(ACTION_SOURCES.SERVER, action);
    }

    handleAction(source, action) {
        "use strict";
        this.dispatch({source, action});
    }
}