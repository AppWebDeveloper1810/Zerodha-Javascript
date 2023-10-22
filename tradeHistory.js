// TradeHistory.js
const Userr = require('./user');
const PortfolioTracker = require('./portfolioTracker'); // Assuming you have a separate file for PortfolioTracker

const User = Userr[0]
const userData = Userr[1]

class TradeHistory{
  constructor() {
    this.portfolioTracker = new PortfolioTracker();
    this.tradeHistory = [];
  }

  // Record a trade in the trade history
  recordTrade(userId, portfolioName, stockSymbol, quantity, pricePerShare) {
    // First, ensure that the user and portfolio exist
    if (!this.portfolioTracker.portfolios[userId]) {
      return 'User does not exist.';
    }
    if (!this.portfolioTracker.portfolios[userId][portfolioName]) {
      return 'Portfolio does not exist';
    }

    // Calculate the trade cost
    const cost = quantity * pricePerShare;

    // Check if there is enough balance in the portfolio to cover the trade
    if (this.portfolioTracker.portfolios[userId][portfolioName].balance >= cost) {
      // Deduct the cost from the portfolio's balance
      this.portfolioTracker.portfolios[userId][portfolioName].balance -= cost;

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
