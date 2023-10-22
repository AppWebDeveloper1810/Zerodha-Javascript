const axios = require('axios');
const secrets = require('./secrets');
const crypto = require('crypto');

async function getStockSummary(symbol, region) {
  const options = {
    method: 'GET',
    url: 'https://zerodha-javascript.p.rapidapi.com/stock/v2/get-summary',
    params: {
      symbol,
      region,
    },
    headers: {
      'X-RapidAPI-Key': secrets[1],
      'X-RapidAPI-Host': secrets[0],
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw error;
  }
}
function generateHexUserId(length) {
  const numBytes = Math.ceil(length / 2); // Each byte corresponds to 2 hex digits
  const randomBytes = crypto.randomBytes(numBytes);
  const hexUserId = randomBytes.toString('hex').slice(0, length);
  return hexUserId;
}

// Example usage:
async function main() {
  try {
    const symbol = 'AMRN'; // Replace with the desired stock symbol
    const stockSummary = await getStockSummary(symbol);
    const data = stockSummary['summaryDetail'];
    console.log(data.currency);
    console.log(stockSummary['quoteType'].market.split('_')[0]);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getStockSummary, generateHexUserId };
