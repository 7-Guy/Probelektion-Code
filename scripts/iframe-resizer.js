// iframe-resizer.js
// Adds a load listener to iframes with given IDs and resizes their height
(function () {
  function resizeIframeById(iframeId) {
    var iframe = document.getElementById(iframeId);
    if (!iframe) return;
    iframe.addEventListener("load", function () {
      try {
        var h = iframe.contentWindow.document.body.scrollHeight;
        iframe.style.height = h + "px";
      } catch (e) {
        // cross-origin or other error - keep default height
        console.warn("Could not resize iframe", iframeId, e);
      }
    });
  }

  // expose a helper to the global scope
  window.iframeResizer = function (ids) {
    if (!ids) return;
    if (Array.isArray(ids)) {
      ids.forEach(function (id) {
        resizeIframeById(id);
      });
    } else if (typeof ids === "string") {
      resizeIframeById(ids);
    }
  };
})();
