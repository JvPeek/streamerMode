
String.prototype.replaceArray = function (replaceObject) {
  let replaceString = this;
  replaceObject.forEach(replaceLine => {
    replaceString = replaceString.replaceAll(replaceLine.search, replaceLine.replace);
  });
  return replaceString;
}

function replaceInElement(element) {
  const replaceObject = [
    { "type": "text", "search": "Ingolstädter", "replace": "Blumen", "case": false },
    { "type": "text", "search": "JvPeek", "replace": "JvBier" },
    { "type": "text", "search": "janofthings@gmail.com", "replace": "me@yourmother.com" },
  
  ]
  if (element.dataset?.streamermodereplace == "no-replace") {
    console.log("no-replace in element");
    return element;
  }
  for (var j = 0; j < element.childNodes.length; j++) {

    var node = element.childNodes[j];
    if (node.dataset?.streamermodereplace == "no-replace") {
      console.log("no-replace in node");
      return element;
    }
    if (node.nodeType === 1) {
      replaceInElement(node);
    }
    if (node.nodeType === 3) {
      var text = node.nodeValue;
      console.log(node);
      var replacedText = text.replaceArray(replaceObject)
      if (replacedText != text) {
        element.replaceChild(document.createTextNode(replacedText), node);
      }
    }
  }
  return element;
}

// this code will be executed after page load
(function () {
  replaceInElement(document.querySelector("body"));
  console.log("Dings, äh.. hier.. ersetzen");
  const targetNode = document.querySelector("body");


  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {

      for (const node of mutation.addedNodes) {
        replaceInElement(node);
        //node.data = node.data.replace("JvPeek", "JvBier");
      }

    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, { attributes: false, childList: true, subtree: true });

})();
