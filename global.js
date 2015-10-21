(function(){
  "use strict";

  if (!safari.application) {
    return;
  }

  function domains() {
    return (safari.extension.settings.whitelist || "")
            .split(/\s*,\s*/)
            .map(function(domain) {
              return domain.replace(/^(?:https?:\/\/)?([^\/]+).*?$/i, function(_, host) {
                return host;
              });
            })
            .reduce(function(buffer, domain) {
              return buffer.concat([domain, "www." + domain]);
            }, []);
  }

  function notify() {
    var whitelist = domains();

    safari.application.browserWindows.forEach(function(window) {
      window.tabs.forEach(function(tab) {
        tab.page.dispatchMessage("whitelist", whitelist);
      });
    });
  }

  safari.extension.settings.addEventListener("change", function() {
    notify();
  }, false);

  safari.application.addEventListener("message", function() {
    notify();
  }, false);

  notify();
})();
