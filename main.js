// Replace this with your Alpha Vantage API key
const apiKey = 'T3Q0Y7D4W8TVWJQV';

// Example stock symbol
const stockSymbol = 'MSFT';

// Fetch stock quotes
async function fetchStockQuotes(symbol) {
    const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`);
    const data = await response.json();
    return data['Global Quote'];
}

// Fetch stock chart data (historical)
async function fetchStockChartData(symbol) {
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${apiKey}`);
    const data = await response.json();
    return data['Time Series (Daily)'];
}

// Fetch financial data (example: earnings per share)
async function fetchFinancialData(symbol) {
    const response = await fetch(`https://www.alphavantage.co/query?function=EARNINGS&symbol=${symbol}&apikey=${apiKey}`);
    const data = await response.json();
    return data['annualEarnings'];
}

// Render stock quotes
function renderStockQuotes(quotes) {
    const stockQuotesTable = document.getElementById('stock-quotes-table');
    const row = `
        <tr>
            <td>${quotes['01. symbol']}</td>
            <td>${quotes['01. symbol']}</td> <!-- Replace this with actual company name if available from another API endpoint -->
            <td>${parseFloat(quotes['05. price']).toFixed(2)}</td>
            <td>${parseFloat(quotes['09. change']).toFixed(2)}</td>
            <td>${parseFloat(quotes['10. change percent']).toFixed(2)}%</td>
        </tr>
    `;
    stockQuotesTable.innerHTML = row;
}

// Render stock chart data (using a simple example with an HTML table, you should use a chart library like Chart.js or Highcharts for better visualization)
function renderStockChartData(chartData) {
    const stockChartContainer = document.getElementById('stock-chart-container');
    let tableRows = '<table><thead><tr><th>Date</th><th>Close</th></tr></thead><tbody>';
    for (const date in chartData) {
        tableRows += `<tr><td>${date}</td><td>${parseFloat(chartData[date]['4. close']).toFixed(2)}</td></tr>`;
    }
    tableRows += '</tbody></table>';
    stockChartContainer.innerHTML = tableRows;
}

// Render financial data
function renderFinancialData(financialData) {
    const financialDataTable = document.getElementById('financial-data-table');
    let tableRows = '';
    financialData.forEach(item => {
        tableRows += `<tr><td>Earnings Per Share (${item['fiscalDateEnding']})</td><td>${parseFloat(item['reportedEPS']).toFixed(2)}</td></tr>`;
    });
    financialDataTable.innerHTML = tableRows;
}

// Fetch and render data
async function fetchDataAndRender() {
    const quotes = await fetchStockQuotes(stockSymbol);
    const chartData = await fetchStockChartData(stockSymbol);
    const financialData = await fetchFinancialData(stockSymbol);

    renderStockQuotes(quotes);
    renderStockChartData(chartData);
    renderFinancialData(financialData);
}

// Search stocks
async function searchStocks(event) {
    event.preventDefault();

    const searchInput = document.getElementById('search-input');
    const symbol = searchInput.value.trim();

    if (symbol) {
        const quotes = await fetchStockQuotes(symbol);
        const chartData = await fetchStockChartData(symbol);
        const financialData = await fetchFinancialData(symbol);

        renderStockQuotes(quotes);
        renderStockChartData(chartData);
        renderFinancialData(financialData);
    }
}

// Add an event listener for search form submission
document.getElementById('search-form').addEventListener('submit', searchStocks);

// Fetch and render data on page load
fetchDataAndRender();

