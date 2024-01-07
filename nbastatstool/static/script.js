var playerStats = [];

function generateStatsInfo() {
    var statsContainer = document.getElementById("statsContainer");
    statsContainer.innerHTML = "";
    statsContainer.className = "table-container"

    var table = document.createElement("table");
    table.className = 'stats-table';

    var headerRow = table.insertRow();
    headerRow.className = 'header-row';

    headerRow.insertCell().textContent = "Name";
    headerRow.insertCell().textContent = "Points";
    headerRow.insertCell().textContent = "Rebounds";
    headerRow.insertCell().textContent = "Assists";
    headerRow.insertCell().textContent = "Field Goals";
    headerRow.insertCell().textContent = "Three-Pointers";
    headerRow.insertCell().textContent = "Free Throws";

    var statOrder = ['pts', 'trb', 'ast', 'fg', 'fg3', 'ft'];
    playerStats.forEach(function (player) {
        var row = table.insertRow();
        row.insertCell().textContent = player.name;
    
        for (var i = 0; i < statOrder.length; i++) {
            var statCategory = statOrder[i];
            if (statCategory !== 'name') {
                var cell = row.insertCell();
                cell.textContent = player[statCategory];
    
                var max = playerStats.every(function (p) {
                    return player[statCategory] >= p[statCategory];
                });
    
                if (max) {
                    cell.style.color = 'green';
                }
            }
        }
    });

    statsContainer.appendChild(table);
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
}

function scrapeAndDisplay(url1, url2) {
    fetch(`/scrape-stats?url1=${encodeURIComponent(url1)}&url2=${encodeURIComponent(url2)}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        playerStats = data;
        generateStatsInfo();
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById("urlForm").addEventListener("submit", function (event) {
    event.preventDefault(); 
    var url1 = document.getElementById("urlInput1").value;
    var url2 = document.getElementById("urlInput2").value;
    if (url1 && url2) {
        scrapeAndDisplay(url1, url2);
    }
});
