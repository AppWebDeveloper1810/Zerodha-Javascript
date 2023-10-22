const axios = require('axios');

const apiKey = require('./secrets'); // Get your API key from Alpha Vantage

async function getStockInfo(stockSymbol) {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockSymbol}&apikey=${apiKey}`
    );

    if (response.data) {
      const data = response.data;
      const country = data.Country;
      const currency = data.Currency;
      console.log(`Stock Symbol: ${stockSymbol}`);
      console.log(`Country: ${country}`);
      console.log(`Currency: ${currency}`);
    } else {
      console.log('Stock information not found.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

const stockSymbol = 'AAPL'; // Replace with the desired stock symbol
getStockInfo(stockSymbol);
