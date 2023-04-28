
window.onload = function () {
    chrome.storage.local.get(["filterList"], (result) => {
        document.getElementById("output").value = JSON.stringify(result, null, " ");
        result.filterList.forEach((row, key) => {
            let thisRow = document.createElement("tr");
            let thisColumn = document.createElement("td");
            thisColumn.innerText=key;
            thisRow.appendChild(thisColumn);
            ["search", "replace"].forEach((field, fieldKey) => {
                let thisColumn = document.createElement("td");
                thisColumn.innerText=row[field];
                thisColumn.classList.add("row" + key);
                thisColumn.classList.add("column" + fieldKey);
                thisRow.appendChild(thisColumn);
            });
            document.getElementById("filterList").appendChild(thisRow);
        });
    });
    document.getElementById("save").onclick = function () {

        chrome.storage.local.set(JSON.parse(document.getElementById("output").value), () => {
            alert("okay");
        });
    }
};

