const initialPortfolioBalance = 10000


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
        balance: initialPortfolioBalance, // Initial portfolio balance
        holdings: {}, // Stocks and quantities held
      };
    }
  
    // Buy stocks and add them to a user's portfolio
    buyStock(userId, portfolioName, stockSymbol, quantity, pricePerShare) {
      // If User does not exist
      if (!this.portfolios[userId]) { 
        //throw new Error('User does not have a portfolio.'); // Disabled so that the code does not crash
        console.log('User does not have a portfolio.')
    }
      const portfolio = this.portfolios[userId][portfolioName];
      // If portfolio does not exist
      // Portfolio will only exist when createPOrtfolio function is called
      if (!portfolio) {
        //throw new Error('Portfolio does not exist.'); // Disabled so that the code does not crash
        console.log('Portfolio does not exist.')
      }
      // When User and Portfolio exist
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
          // throw new Error('User does not have a portfolio.');
          return 'User does not have a portfolio.';
        }
      
        const portfolio = this.portfolios[userId][portfolioName];
        if (!portfolio) {
          // throw new Error('Portfolio does not exist.');
          return 'Portfolio does not exist.';
        }
      
        if (!portfolio.holdings[stockSymbol]) {
            // The stock is not in the portfolio
            // throw new Error('Insufficient stocks to sell.');
            return 'Insufficient stocks to sell.';
        }
        
        if (portfolio.holdings[stockSymbol] < quantity) {
            // The quantity of the stock is less than the desired quantity to sell
            // throw new Error('Insufficient stocks to sell.');
            return 'Insufficient stocks to sell.';
        }
        
      
        const profit = quantity * pricePerShare;
        portfolio.holdings[stockSymbol] -= quantity;
        portfolio.balance += profit;
      }
      
      //I've added throw statements with return statements as comments after them. You can choose whether to use throw or return based on your error handling preferences.
      
  
    // Get the user's portfolio summary
    getPortfolio(userId, portfolioName) {
      if (!this.portfolios[userId] || !this.portfolios[userId][portfolioName]) {
        return null;
      }
      return this.portfolios[userId][portfolioName];
    }
  }
  
  module.exports = PortfolioTracker;