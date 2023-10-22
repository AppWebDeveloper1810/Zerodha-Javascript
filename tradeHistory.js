// TradeHistory.js
const Userr = require('./user');

const User = Userr[0]
const userData = Userr[1]

class TradeHistory{
  constructor() {
    this.tradeHistory = [];
  }

  // Record a trade in the trade history
  recordTrade(userId, portfolioName, stockSymbol, quantity, pricePerShare) {
    // First, ensure that the user and portfolio exist
    if (!this.portfolios[userId] || !this.portfolios[userId][portfolioName]) {
      return 'User or portfolio does not exist.';
    }

    // Calculate the trade cost
    const cost = quantity * pricePerShare;

    // Check if there is enough balance in the portfolio to cover the trade
    if (this.portfolios[userId][portfolioName].balance >= cost) {
      // Deduct the cost from the portfolio's balance
      this.portfolios[userId][portfolioName].balance -= cost;

      // Add the trade to the trade history
      this.tradeHistory.push({
        userId,
        portfolioName,
        stockSymbol,
        quantity,
        pricePerShare,
      });

      return 'Trade recorded successfully.';
    } else {
      return 'Insufficient balance to make the trade.';
    }
  }

  // Get the complete trade history
  getTradeHistory() {
    return this.tradeHistory;
  }
}

module.exports = TradeHistory;


const trader = new TradeHistory();
trader.createPortfolio('user123', 'Main Portfolio');
trader.buyStock('user123', 'Main Portfolio', 'AAPL', 10, 150);
trader.sellStock('user123', 'Main Portfolio', 'AAPL', 3, 170);
const userPortfolio = trader.getPortfolio('user123', 'Main Portfolio');
console.log(userPortfolio);
console.log(trader.tradeHistory);

module.exports = TradeHistory;
