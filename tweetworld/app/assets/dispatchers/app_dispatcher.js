const flux = require('flux');
const AppConstants = require("../lib/constants");

const AppDispatcher = new class extends flux.Dispatcher {
    handleViewAction (action) {
        "use strict";
        this.handleAction(AppConstants.ACTION_SOURCES.VIEW, action);
    }

    handleServerAction (action) {
        "use strict";
        this.handleAction(AppConstants.ACTION_SOURCES.SERVER, action);
    }

    handleAction (source, action) {
        "use strict";
        console.log(source, action);
        this.dispatch({ source, action });
    }
};

module.exports = AppDispatcher;