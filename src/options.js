
window.onload = function () {
    chrome.storage.local.get(["filterList"], (result) => {
        document.getElementById("output").value = JSON.stringify(result, null, " ");
    });
    document.getElementById("save").onclick = function () {

        chrome.storage.local.set(JSON.parse(document.getElementById("output").value), () => {
            alert("okay");
        });
    }
};

