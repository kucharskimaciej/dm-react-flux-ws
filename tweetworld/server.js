var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var config = require('./webpack.config.js');



var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    // webpack-dev-server options

    contentBase: "app/",
    // or: contentBase: "http://localhost/",
});
server.listen(8080, "localhost", function () {
    "use strict";
    console.log("Server is running on %s:%s", "localhost", 8080);
});

compiler.watch({ // watch options:
    aggregateTimeout: 300 // wait so long for more changes
}, function (err, stats) {
    if(stats.hasErrors()) {
        console.log(stats.toJSON());
    } else {
        console.log("recompiled...")
    }
});