(function(){
  var each = Array.prototype.forEach;

  function cleanup() {
    var links = document.querySelectorAll("a[target]");
    each.call(links, function(link) {
      if (link.target === "_blank" || link.target == "_new") {
        link.removeAttribute("target");
      }
    });
  }

  cleanup();
  setInterval(cleanup, 5000);
})();
