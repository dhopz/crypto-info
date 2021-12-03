import { onAuthStateChanged } from '@firebase/auth';
import axios from 'axios';
import {React, createContext, useContext , useState, useEffect } from 'react'
import { CoinList } from './config/api';
import { auth } from './firebase';


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
