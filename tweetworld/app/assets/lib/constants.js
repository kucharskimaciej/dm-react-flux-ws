module.exports = {
    EVENTS: {
        CHANGE: "change",
        ADD: "add",
        RESET: "reset"
    },
    SOCKET_EVENTS: {
        NEW_TWEET: "tweet:new",
        CONNECTED: "connection",
        DISCONNECTED: "disconnect"
    },
    ACTIONS: {
        ADD_TWEET: "tweet:add",
        REMOVE_TWEET: "tweet:remove",
        CLEAR_TWEETS: "tweet:clear"
    },
    ACTION_SOURCES: {
        VIEW: "action:view",
        SERVER: "action:server"
    }
};