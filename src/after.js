
String.prototype.replaceArray = function () {

  let replaceString = this;

  let myRe;
  replaceObject.forEach(replaceLine => {
    myRe = new RegExp(replaceLine.search, "gm" + (replaceLine.case === true ? "i" : ""));
    // replaceString = replaceString.replaceAll(replaceLine.search, replaceLine.replace);
    replaceString = replaceString.replaceAll(myRe, replaceLine.replace);
  });
  return replaceString;
}

function replaceInElement(element) {


  if (element.dataset?.streamermodereplace == "no-replace") {
    console.log("no-replace in element");
    return element;
  }
  if (element.nodeType === 3) {
    var text = element.nodeValue;
    var replacedText = text.replaceArray()

    if (replacedText != text) {

      element.nodeValue = replacedText;
    }
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
      var replacedText = text.replaceArray()

      if (replacedText != text) {

        element.replaceChild(document.createTextNode(replacedText), node);
      }
    }
  }
  return element;
}

let replaceObject = [];
function loadStorage() {
  console.log("lade daten");

  replaceObject = chrome.storage.local.get("filterList") || [];

  chrome.storage.local.get(["filterList"]).then((result) => {
    replaceObject = result.filterList || [];
    reworkPage();

  });
}
// this code will be executed after page load
(function () {
  loadStorage();
  chrome.storage.onChanged.addListener(loadStorage)


})();

function unBlur() {
  document.body.classList.add("noBlurFilter");
}
function blur() {
  document.body.classList.remove("noBlurFilter");
}
function reworkPage() {

  replaceInElement(document.querySelector("body"));
  console.log("Dings, äh.. hier.. ersetzen");
  
  
  const targetNode = document.querySelector("body");
  const mutationCallback = (mutationList, observer) => {
    blur();
    console.log("ES MUTIERT!");
    for (const mutation of mutationList) {

      for (const node of mutation.addedNodes) {
        console.log(node);
        replaceInElement(node);
      }

    }
    unBlur();
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(mutationCallback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, { attributes: false, childList: true, subtree: true, characterData: true });
  unBlur();

}