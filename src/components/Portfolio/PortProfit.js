import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { balance } from '../../config/balance';
import { CryptoState } from '../../CryptoContext';
import { numberWithCommas } from '../../components/CoinsTable'

const useStyles = makeStyles({
  root: {
    backgroundColor: "transparent",
    border: "none", 
    boxShadow: "none",
    height:100,
    minWidth: 275,
    align:"left",
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    padding: '10px'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


export default function PortProfit() {
  const classes = useStyles();
  const { coins } = CryptoState()
  const portfolioCoins = balance.map(element => element.id)
  const portfolio = coins.filter(coin => portfolioCoins.includes(coin.id))  

  const updatedPortfolio = portfolio.map(v => ({ ...v, ...balance.find(sp => sp.id === v.id) }));
  const updateBalance = updatedPortfolio.map( portfolio => portfolio.units * portfolio.current_price);
  const initialBalance = balance.reduce((s, a) => s + a.value, 0); 
  const total = updateBalance.reduce( (a,b) => (a+b),0 );

  let profit = total >= 0;  

  // console.log(coins);
  // console.log(portfolio);
  
  return (
    <Card className={classes.root} style={{backgroundColor: "transparent"}}>
      <CardContent>
        <Typography className={classes.title} align="left" color="textSecondary" gutterBottom>
          Profit
        </Typography>
        <Typography variant="h4" component="h2" align="left" style={{
          color: profit > 0 ? "rgb(14, 203, 129)" : "red",
          fontWeight: 500,
        }}>
          {numberWithCommas((total-initialBalance).toFixed(2))}
        </Typography>
      </CardContent>
    </Card>
    
  );
}
