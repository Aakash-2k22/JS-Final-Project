async function fetchData() {
    try {
        const response = await fetch('https://api.rootnet.in/covid19-in/stats/latest');
        const data = await response.json();
        populateTable(data.data.regional);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('tableBody').innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-danger"><i class="fa-solid fa-triangle-exclamation"></i> Failed to fetch data. Please try again later.</td>
            </tr>
        `;
    } 
}

function populateTable(regionalData) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    regionalData.forEach((state, index) => {
        const row = tableBody.insertRow();
        const totalCases = state.confirmedCasesIndian + state.confirmedCasesForeign;

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${state.loc}</td>
            <td>${state.confirmedCasesIndian.toLocaleString()}</td>
            <td>${state.confirmedCasesForeign.toLocaleString()}</td>
            <td>${state.discharged.toLocaleString()}</td>
            <td>${state.deaths.toLocaleString()}</td>
            <td>${totalCases.toLocaleString()}</td>
        `;
    });
}

document.addEventListener('DOMContentLoaded', fetchData);