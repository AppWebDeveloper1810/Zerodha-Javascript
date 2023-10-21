// npx mocha test/portfolioTracker-tests.js for running tests

const chai = require('chai');
const expect = chai.expect;
const PortfolioTracker = require('../portfolioTracker'); // Adjust the path as needed

describe('PortfolioTracker', () => {
    let tracker;
  
    beforeEach(() => {
      tracker = new PortfolioTracker();
    });
  
    it('should create a portfolio for a user', () => {
      tracker.createPortfolio('user123', 'Main Portfolio');
      const portfolio = tracker.getPortfolio('user123', 'Main Portfolio');
      expect(portfolio).to.exist;
      expect(portfolio.balance).to.equal(10000);;
      expect(portfolio.holdings).to.deep.equal({});
    });
  
    it('should buy and sell stocks in a portfolio', () => {
        tracker.createPortfolio('user123', 'Main Portfolio');
        tracker.buyStock('user123', 'Main Portfolio', 'AAPL', 10, 150);
        console.log("1ASD" + tracker.getPortfolio('user123', 'Main Portfolio').balance)
        tracker.buyStock('user123', 'Main Portfolio', 'GOOG', 5, 250);
        console.log("2ASD" + tracker.getPortfolio('user123', 'Main Portfolio').balance)
        tracker.sellStock('user123', 'Main Portfolio', 'AAPL', 3, 170);
        console.log("3ASD" + tracker.getPortfolio('user123', 'Main Portfolio').balance)
        const portfolio = tracker.getPortfolio('user123', 'Main Portfolio');
        console.log(portfolio.balance, portfolio.holdings)
        // Update the expectations based on the corrected calculations
        expect(portfolio.holdings).to.deep.equal({ 'AAPL': 7, 'GOOG': 5 });
        expect(portfolio.balance).to.equal(7760);
      });      
  
    it('should handle insufficient balance', () => {
      tracker.createPortfolio('user123', 'Main Portfolio');
      const result = tracker.buyStock('user123', 'Main Portfolio', 'AAPL', 10, 1500);
      expect(result).to.equal('Insufficient balance to buy stocks.');
    });
  
    // Add more test cases as needed
  });