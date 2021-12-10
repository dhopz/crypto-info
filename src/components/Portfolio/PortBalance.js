import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CryptoState } from '../../CryptoContext';
import { createBalance } from '../TotalBalance'
import { balance } from '../../config/balance';
import { numberWithCommas } from '../../components/CoinsTable'
import { LinearProgress } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    backgroundColor: "transparent",
    border: "none", 
    boxShadow: "none",
    height:125,
    minWidth: 275,
    align:"left",
    textAlign: 'left',
    justifyContent: 'left',
    alignContent: 'left',
    padding: '10px',
  
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },  
});

const PortBalance = () => {
  const classes = useStyles();
  const { coins } = CryptoState()  
  const portfolioCoins = balance.map(element => element.id)
  const portfolio = coins.filter(coin => portfolioCoins.includes(coin.id))  
  const updatedPortfolio = portfolio.map(v => ({ ...v, ...balance.find(sp => sp.id === v.id) }));  
  const updateBalance = updatedPortfolio.map( portfolio => portfolio.units * portfolio.current_price);
  const total = updateBalance.reduce( (a,b) => (a+b), 0);
  
  
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} align="left" color="textSecondary" gutterBottom>
          My Balance
        </Typography>
        <Typography variant="h4" component="h2" align="left"
        style={{
          fontWeight: 600}}
          >
          {numberWithCommas(total.toFixed(2))}
        </Typography>
      </CardContent>
    </Card>
    
  );
}
export default PortBalance;
