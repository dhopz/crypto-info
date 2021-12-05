import React from 'react';
import { balance } from '../config/balance';
import { coinPrices } from '../config/prices';
import {Pie, Doughnut} from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
Chart.register(ArcElement);



const PortfolioPie = () => {
  // const [prices, setPrices] = useState();
  // const { currency } = CryptoState();

  const balances= balance.map(element => element.units * coinPrices[0][element.id]['usd']);
  const totalValue = Math.round(balances.reduce((partial_sum, a) => partial_sum + a, 0));

  const state = {    
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: [
          '#00FFF5',
          '#C9DE00',
          '#2FDE00',
          '#00A6B4',
          '#6800B4'
        ],
        hoverBackgroundColor: [
        '#501800',
        '#4B5000',
        '#175000',
        '#003350',
        '#35014F'
        ],
        data: balances,
        hoverOffset: 4
      }
    ]
  }
  const useStyles = makeStyles((theme) => ({
    container: {
      width: "450px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "50%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

  const plugins = [{
    beforeDraw: function(chart) {
     var width = chart.width,
         height = chart.height,
         ctx = chart.ctx;
         ctx.fillStyle = "#00FFF5";
         ctx.restore();
         var fontSize = (height / 200).toFixed(2);
         ctx.font = fontSize + "em sans-serif";
         ctx.textBaseline = "middle";
         var text = totalValue,
         textX = Math.round((width - ctx.measureText(text).width) / 2),
         textY = height / 2;
         ctx.fillText(text, textX, textY);
         ctx.save();
    } 
  }]
  
  const classes = useStyles();
  
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  
  const portfolioCoins = balance.map(element => element.id)
  console.log(portfolioCoins.toString());
    
  balance.forEach(element => {
    console.log(element.id, element.units * coinPrices[0][element.id]['usd']);
  });

  

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>  
        <Doughnut
            data={state}            
            options={{
              cutout:"80%",
            }}
            plugins={plugins}
          />
            
      </div>
    </ThemeProvider>  
   
  )
}

export default PortfolioPie
