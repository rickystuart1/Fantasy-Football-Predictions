const tableData = data1;

// get table references
var tbody = document.querySelector('#topten');

function buildTable(data) {
    // First, clear out any existing data
    tbody.innerHTML = "";

    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
        // Append a row to the table body
        const row = document.createElement('tr');
        tbody.appendChild(row);

        // Loop through each field in the dataRow and add
        // each value as a table cell (td)
        Object.values(dataRow).forEach((val) => {
            const cell = document.createElement('td');
            cell.innerText = val;
            row.appendChild(cell)
        });
    });
}


function filterTable(filter) {
    tbody.innerHTML = "";

    tableData.forEach(entry => {
        console.log(entry, filter)
        if (entry [filter.key].toLowerCase() === filter.value.toLowerCase() || filter.value.toLowerCase() === 'all') {
            const row = document.createElement('tr');
            tbody.appendChild(row);

            Object.values(entry).forEach((val) => {
                const cell = document.createElement('td');
                cell.innerText = val;
                row.appendChild(cell)
            });
        }
    })
}

// Build the table when the page loads
buildTable(tableData);