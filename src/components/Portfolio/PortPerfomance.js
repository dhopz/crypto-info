import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { balance } from '../../config/balance';
import { CryptoState } from '../../CryptoContext';

const useStyles = makeStyles({
  root: {
    backgroundColor: "transparent",
    border: "none", 
    boxShadow: "none",
    height:125,
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

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function SimpleCard() {
  const classes = useStyles();
  const { coins } = CryptoState()
  const portfolioCoins = balance.map(element => element.id)
  const portfolio = coins.filter(coin => portfolioCoins.includes(coin.id))  

  // const updatedPortfolio = portfolio.map(v => ({ ...v, ...balance.find(sp => sp.id === v.id) }));
  // const updateBalance = updatedPortfolio.map( portfolio => portfolio.units * portfolio.current_price);
  // const initialBalance = balance.reduce((s, a) => s + a.value, 0); 
  // const total = updateBalance.reduce( (a,b) => (a+b) );
  // const simpleReturn = ((total-initialBalance)/initialBalance) * 100

  // let profit = total >= 0;  
  
  return (
    <Card className={classes.root} style={{backgroundColor: "transparent"}}>
      <CardContent>
        <Typography className={classes.title} align="left" color="textSecondary" gutterBottom>
          Simple Return
        </Typography>
        {/* <Typography variant="h4" component="h2" align="left" style={{
          color: profit > 0 ? "rgb(14, 203, 129)" : "red",
          fontWeight: 500,
        }}>
          {numberWithCommas((simpleReturn).toFixed(2))}%
        </Typography> */}
      </CardContent>
    </Card>
    
  );
}
