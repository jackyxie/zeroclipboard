// This wraps the returned element with some basic functions needed for ZeroClipboard
function elementWrapper(element) {

  // don't wrap twice
  if (!element || element.addClass) return element;

  // extend element with a few useful methods
  element.hide = function () { this.style.display = 'none'; };
  element.show = function () { this.style.display = ''; };
  element.addClass = function (name) { this.removeClass(name); this.className += ' ' + name; };
  element.removeClass = function (name) {
    var classes = this.className.split(/\s+/);
    var idx = -1;
    for (var k = 0; k < classes.length; k++) {
      if (classes[k] == name) { idx = k; k = classes.length; }
    }
    if (idx > -1) {
      classes.splice(idx, 1);
      this.className = classes.join(' ');
    }
    return this;
  };
  element.hasClass = function (name) {
    return !!this.className.match(new RegExp("\\s*" + name + "\\s*"));
  };
  return element;
}

ZeroClipboard.$ = function (query) {

  var ZeroClipboardSelect = function (s, n) { return n.querySelectorAll(s); },
    result;

  // Prefer Sizzle, if available.
  if (typeof Sizzle === "function") {
    ZeroClipboardSelect = function (s, n) { return Sizzle.uniqueSort(Sizzle(s, n)); };
  }

  if (typeof query === "string") {
    result = ZeroClipboardSelect(query, document);
    // last ditch effort for backwards compatibility
    if (result.length === 0) result = [document.getElementById(query)];
  }

  result.map(function (elm) {
    return elementWrapper(elm);
  });

  // for single matches
  if (result.length === 1) return result[0];

  return result;
};