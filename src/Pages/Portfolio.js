import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Container, Typography } from '@material-ui/core';
import PortCarousel from '../components/Portfolio/PortCarousel'
import clsx from "clsx";
import PortfolioPie from '../components/Portfolio/PortfolioPie';
import PortTable2 from '../components/Portfolio/PortTable2'
import { balance } from '../config/balance'
import CoinsTable from '../components/CoinsTable';
import { CryptoState } from '../CryptoContext'

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%", // So that grids 1 & 4 go all the way down
    minHeight: 150, // Give minimum height to a div
    border: "1px solid black",
    fontSize: 30,
    textAlign: "center"
  },
  containerTall: {
    minHeight: 175 // This div has higher minimum height
  },
  containerTallb: {
    minHeight: 375 // This div has higher minimum height
  },
  containerTallc: {
    minHeight: 400 // This div has higher minimum height
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: 140,
    maxHeight: 140,
  },
  dialogPaper: {
    minHeight: '40vh',
    maxHeight: '40vh',
  },
  paperChart: {
    minHeight: '40vh',
    maxHeight: '40vh',
  }
}));

export default function CenteredGrid() {

  const { currency, symbol, coins, loading, fetchCoins } = CryptoState();

  // const portfolioCoins = balance.map(element => element.id)
  // const portfolio = coins.filter(coin => portfolioCoins.includes(coin.id))
  // console.log(portfolio);


  const classes = useStyles();

  return (
    <Container>
      <Grid container direction="row" spacing={2}>
        <Grid item container direction="column" xs spacing={2} xs={8}>
          <Grid item xs>
            <div className={clsx(classes.container, classes.containerTall)}>
              
            </div>
          </Grid>
          <Grid item xs>
            <div className={clsx(classes.container, classes.containerTall)}>
            <Typography
                    variant="h6"
                    align="left"
                    style={{ 
                      margin:10, 
                      fontFamily:"Roboto",
                      color:"#00ADB5"
                    }}
                    >
                    Watchlist
                </Typography>
              <PortCarousel>                
              </PortCarousel>
            </div>
          </Grid>
          <Grid item xs>
            <div className={clsx(classes.container, classes.containerTallc)}>
              Graph
            </div>
          </Grid>
        </Grid>
        <Grid item container direction="column" xs spacing={2}>
          <Grid item xs>
            <div className={clsx(classes.container, classes.containerTallb)}>
              4
            </div>
          </Grid>
          <Grid item xs>
            <div className={clsx(classes.container, classes.containerTallb)}>
              
              <Typography
                    variant="h6"
                    align="left"
                    style={{ 
                      margin:10, 
                      fontFamily:"Roboto",
                      color:"#00ADB5"
                    }}
                    >
                    Portfolio ({symbol})
                </Typography>
                <PortTable2>
              </PortTable2>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
