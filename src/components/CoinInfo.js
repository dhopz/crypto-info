import { createTheme } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { HistoricalChart } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { Classnames } from 'react-alice-carousel';

const CoinInfo = ( coin ) => {

    const [historicalData, setHistoricalData] = useState();
    const [days, setDays] = useState(1);

    const { currency } = CryptoState();

    const fetchHistoricData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency))
        setHistoricalData(data.prices)

    }; 

    useEffect(() => {
        fetchHistoricData()
    }, [currency,days]);

    const darkTheme = createTheme({
        palette: {
            primary:{ 
                main:'#fff',
            },
            type: 'dark',
        },
      });

    const useStyles = makeStyles((theme) => ({
    container: {
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        padding: 40,
        [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
        },
    },
    }));
    


    return (
        <ThemeProvider theme={darkTheme}>
            <div className={Classnames.container}/>


        </ThemeProvider>
    )
}

export default CoinInfo
