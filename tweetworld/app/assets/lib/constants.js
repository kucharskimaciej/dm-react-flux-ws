module.exports = {
    EVENTS: {
        CHANGE: "change",
        ADD: "add",
        RESET: "reset"
    },
    SOCKET_EVENTS: {
        NEW_TWEET: "tweet:new",
        CONNECTED: "connect",
        DISCONNECTED: "disconnect"
    },
    ACTIONS: {
        ADD_TWEET: "tweet:add",
        REMOVE_TWEET: "tweet:remove",
        CLEAR_TWEETS: "tweet:clear",
        CONNECTED_TO_SERVER: "server:connected",
        DISCONNECTED_FROM_SERVER: "server:disconnected"
    },
    ACTION_SOURCES: {
        VIEW: "action:view",
        SERVER: "action:server"
    }
};