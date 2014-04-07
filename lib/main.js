exports.main = function() {

    var data = require("sdk/self").data;

    // Create a widget that will open a tab:
    require("sdk/widget").Widget({
        id: "listener",
        label: "listener demo",
        content: "?",
        onClick: function() {
            // Open tab:
            require("sdk/tabs").open({
                url: data.url("demo.html"),
                onReady: function(tab) {
                    var worker = tab.attach({
                        // Content script is re-run following EITHER button
                        // being pressed (whether or not 'demo' event listener
                        // is activated):
                        contentScriptFile: data.url("demo.js")
                    });
                    worker.port.on("demo-dun", function(message) {
                        // This message is output following pressing button
                        // with listener attached by content script:
                        console.log("'demo-dun' emitted message '" +
                            message + "'");
                    });
                    // Sample text below is received by content script every
                    // time content script is run, which is to say, every time
                    // either button is pressed.
                    worker.port.on("initialized", function () {
                        worker.port.emit("demo", "sample text");
                    });
                }
            });
        }
    });

};

