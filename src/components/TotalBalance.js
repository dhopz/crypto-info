import { balance } from "../config/balance";
import { CryptoState } from "../CryptoContext";

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

export function createBalance(balance) {
    
    const { coins } = CryptoState()
    const portfolioCoins = balance.map(element => element.id)
    console.log(portfolioCoins);
    console.log(coins);
    const portfolio = coins.filter(coin => portfolioCoins.includes(coin.id)) 

    
    const updatedPortfolio = portfolio.map(v => ({ ...v, ...balance.find(sp => sp.id === v.id) }));
    const updateBalance = updatedPortfolio.map( portfolio => portfolio.units * portfolio.current_price);
    const initialBalance = balance.reduce((s, a) => s + a.value, 0); 
    const total = updateBalance.reduce( (a,b) => (a+b) );
    const simpleReturn = ((total-initialBalance)/initialBalance) * 100  

    const balanceMetrics = {
        balance: numberWithCommas(updateBalance.toFixed(2)),
        profit: numberWithCommas((total - initialBalance).toFixed(2)),
        performance: numberWithCommas((simpleReturn).toFixed(2))
    }    

    return balanceMetrics    
}

