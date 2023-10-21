class PortfolioTracker {
    constructor() {
      this.portfolios = {}; // Object to store user portfolios
    }
  
    // Add a new portfolio for a user
    createPortfolio(userId, portfolioName) {
      if (!this.portfolios[userId]) {
        this.portfolios[userId] = {};
      }
      this.portfolios[userId][portfolioName] = {
        balance: 0, // Initial portfolio balance
        holdings: {}, // Stocks and quantities held
      };
    }
  
    // Buy stocks and add them to a user's portfolio
    buyStock(userId, portfolioName, stockSymbol, quantity, pricePerShare) {
      if (!this.portfolios[userId]) {
        //throw new Error('User does not have a portfolio.'); // Disabled so that the code does not crash
        return 'User does not have a portfolio.'
    }
      const portfolio = this.portfolios[userId][portfolioName];
      if (!portfolio) {
        //throw new Error('Portfolio does not exist.'); // Disabled so that the code does not crash
        return 'Portfolio does not exist.'
      }
      const cost = quantity * pricePerShare;
      if (portfolio.balance >= cost) {
        if (!portfolio.holdings[stockSymbol]) {
          portfolio.holdings[stockSymbol] = 0;
        }
        portfolio.holdings[stockSymbol] += quantity;
        portfolio.balance -= cost;
      } else {
        //throw new Error('Insufficient balance to buy stocks.'); // Disabled so that the code does not crash
        return 'Insufficient balance to buy stocks.'
      }
    }
  
    // Sell stocks and update the user's portfolio
    sellStock(userId, portfolioName, stockSymbol, quantity, pricePerShare) {
      if (!this.portfolios[userId]) {
        //throw new Error('User does not have a portfolio.'); // Disabled so that the code does not crash
        return 'User does not have a portfolio.'
      }
      const portfolio = this.portfolios[userId][portfolioName];
      if (!portfolio) {
        //throw new Error('Portfolio does not exist.'); // Disabled so that the code does not crash
        return 'Portfolio does not exist.'
      }
      if (!portfolio.holdings[stockSymbol] || portfolio.holdings[stockSymbol] < quantity) {
        //throw new Error('Insufficient stocks to sell.'); // Disabled so that the code does not crash
        return 'Insufficient stocks to sell.'
      }
      portfolio.holdings[stockSymbol] -= quantity;
      portfolio.balance += quantity * pricePerShare;
    }
  
    // Get the user's portfolio summary
    getPortfolio(userId, portfolioName) {
      if (!this.portfolios[userId] || !this.portfolios[userId][portfolioName]) {
        return null;
      }
      return this.portfolios[userId][portfolioName];
    }
  }
  
  // Example usage:
  const tracker = new PortfolioTracker();
  tracker.createPortfolio('user123', 'Main Portfolio');
  console.log(tracker.buyStock('user123', 'Main Portfolio', 'AAPL', 10, 150));
  console.log(tracker.sellStock('user123', 'Main Portfolio', 'AAPL', 3, 170));
  const userPortfolio = tracker.getPortfolio('user123', 'Main Portfolio');
  console.log(userPortfolio);
  
  module.exports = PortfolioTracker;