(function(){
  "use strict";

  var each = Array.prototype.forEach;
  var whitelist = [];

  function cleanup() {
    var hostname = window.top.location.hostname;
    var allowed = whitelist.indexOf(hostname) !== -1;

    if (allowed) {
      return;
    }

    var links = document.querySelectorAll("a[target]");
    each.call(links, function(link) {
      if (link.target === "_blank" || link.target == "_new") {
        link.removeAttribute("target");
      }
    });
  }

  safari.self.addEventListener("message", function(event) {
    whitelist = event.message;
    cleanup();
    setInterval(cleanup, 5000);
  }, false);

  safari.self.tab.dispatchMessage("whitelist");
})();
