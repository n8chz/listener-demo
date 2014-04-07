// content script is re-entered after pressing either button:
alert("entered content script");

// "initialized" event will be emitted once for each tab, IN THEORY.
bodyClasses = document.body.classList;
console.log("body classes: "+JSON.stringify(bodyClasses));
if (bodyClasses.contains("uninitialized")) {
 bodyClasses.remove("uninitialized");
 self.port.emit("initialized");
}

document.getElementById("demo").addEventListener("click", function() {
    alert("event listener added by content script");
    self.port.emit("demo-dun", "demo dun");
});

self.port.on("demo", function(text) {
    alert("'demo' event listener called with message '" + text + "'");
});

