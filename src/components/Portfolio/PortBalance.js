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
    minWidth: 275,
    align:"left",
    textAlign: 'left',
    justifyContent: 'left',
    alignContent: 'left',
    padding: '30px',
  
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
  const updatedPortfolio = portfolio.map(v => ({ ...v, ...balance.find(sp => sp.id === v.id) }));

  const updateBalance = updatedPortfolio.map( portfolio => portfolio.units * portfolio.current_price);
  const total = updateBalance.reduce( (a,b) => (a+b) );


  // console.log("portfolio",updateBalance);
  // console.log(total);
  
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} align="left" color="textSecondary" gutterBottom>
          My Balance
        </Typography>
        <Typography variant="h4" component="h2" align="left">
          {numberWithCommas(total.toFixed(2))}
        </Typography>
      </CardContent>
    </Card>
    
  );
}
