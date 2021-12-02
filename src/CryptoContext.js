import axios from 'axios';
import {React, createContext, useContext , useState, useEffect } from 'react'
import { CoinList } from './config/api';


const Crypto = createContext()

const CryptoContext = ({children}) => {

    const [currency, setCurrency] = useState("USD");
    const [symbol, setSymbol] = useState("£");
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null)

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
        <Crypto.Provider value={{currency,symbol,setCurrency,coins,loading, fetchCoins}}>
            {children}
        </Crypto.Provider>
    )
}

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
}
