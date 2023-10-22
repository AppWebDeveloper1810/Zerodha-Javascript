const chai = require('chai');
const expect = chai.expect;
const TradeHistory = require('../tradeHistory');
const PortfolioTracker = require('../portfolioTracker'); // Assuming you have a separate file for PortfolioTracker
const { getStockSummary, generateHexUserId } = require('../miscellaneous');

describe('TradeHistory', () => {
  let tradeHistory;

  beforeEach(() => {
    tradeHistory = new TradeHistory();
  });

  it('should record a trade successfully', () => {
    const userId = generateHexUserId(16);
    tradeHistory.portfolioTracker.createPortfolio(userId, 'Main Portfolio')
    const result = tradeHistory.recordTrade(userId, 'Main Portfolio', 'AAPL', 10, 150);
    expect(result).to.equal('Trade recorded successfully.');
  });

  it('should handle insufficient balance when recording a trade', () => {
    // Adjust the balance to an insufficient amount
    tradeHistory.portfolioTracker.portfolios = {
      user123: {
        'Main Portfolio': { balance: 100 },
      },
    };

    const result = tradeHistory.recordTrade('user123', 'Main Portfolio', 'AAPL', 10, 200);
    expect(result).to.equal('Insufficient balance to make the trade.');
  });

  it('should get the complete trade history', () => {
    // Add some trades to the history
    tradeHistory.tradeHistory = [
      {
        userId: 'user123',
        portfolioName: 'Main Portfolio',
        stockSymbol: 'AAPL',
        quantity: 10,
        pricePerShare: 150,
      },
      {
        userId: 'user456',
        portfolioName: 'Another Portfolio',
        stockSymbol: 'GOOG',
        quantity: 5,
        pricePerShare: 300,
      },
    ];

    const result = tradeHistory.getTradeHistory();
    expect(result).to.deep.equal(tradeHistory.tradeHistory);
  });
});
