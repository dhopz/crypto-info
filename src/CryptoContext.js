import { onAuthStateChanged } from '@firebase/auth';
import { doc, onSnapshot } from '@firebase/firestore';
import axios from 'axios';
import {React, createContext, useContext , useState, useEffect } from 'react'
import { CoinList } from './config/api';
import { auth, db } from './firebase';
import { balance } from './config/balance'

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Crypto = createContext()

const CryptoContext = ({children}) => {

    const [currency, setCurrency] = useState("USD");
    const [symbol, setSymbol] = useState("£");
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null)
    const [watchlist, setWatchlist] = useState([])    
    const [alert, setAlert] = useState({
        open:false,
        message:"",
        type:"success"
    })

    useEffect(() => {
        if (user) {
          const coinRef = doc(db, "watchlist", user?.uid);
          var unsubscribe = onSnapshot(coinRef, (coin) => {
            if (coin.exists()) {
              //console.log(coin.data().coins);
              setWatchlist(coin.data().coins);
            } else {
              console.log("No Items in Watchlist");
            }
          });
    
          return () => {
            unsubscribe();
          };
        }
      }, [user]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) setUser(user);
          else setUser(null);
        });
        console.log(user);
      }, []);
    

    const fetchCoins = async () => {
        setLoading(true) 
        const { data } = await axios.get(CoinList(currency));
        setCoins(data)
        setLoading(false)

    };    //console.log(coins)

  //   const createBalance = () => {    
      
  //     const portfolioCoins = balance.map(element => element.id)
  //     console.log(portfolioCoins);
  //     console.log(coins);
  //     const portfolio = coins.filter(coin => portfolioCoins.includes(coin.id)) 
  
      
  //     const updatedPortfolio = portfolio.map(v => ({ ...v, ...balance.find(sp => sp.id === v.id) }));
  //     const updateBalance = updatedPortfolio.map( portfolio => portfolio.units * portfolio.current_price);
  //     const initialBalance = balance.reduce((s, a) => s + a.value, 0); 
  //     const total = updateBalance.reduce( (a,b) => (a+b) );
  //     const simpleReturn = ((total-initialBalance)/initialBalance) * 100  
  
  //     setPortfolio({
  //         balance: numberWithCommas(updateBalance.toFixed(2)),
  //         profit: numberWithCommas((total - initialBalance).toFixed(2)),
  //         performance: numberWithCommas((simpleReturn).toFixed(2))
  //     })              
  // }

    useEffect (() => {
        if(currency === "GBP") setSymbol("£");
        else if (currency === "USD") setSymbol("USD");
    }, [currency]);

    return (
        <Crypto.Provider value={{currency,
        symbol,
        setCurrency,
        coins,
        loading,
        fetchCoins,
        alert,
        setAlert,
        user,
        watchlist
        }}>
            {children}
        </Crypto.Provider>
    )
}

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
}
