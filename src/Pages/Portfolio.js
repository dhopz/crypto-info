import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Container, Typography } from '@material-ui/core';
import PortCarousel from '../components/Portfolio/PortCarousel'
import PortChart from '../components/Portfolio/PortChart'
import clsx from "clsx";
import PortfolioPie from '../components/Portfolio/PortfolioPie';
import PortTable2 from '../components/Portfolio/PortTable2'
import PortBalance from '../components/Portfolio/PortBalance'
import PortProfit from '../components/Portfolio/PortProfit'
import PortPerformance from '../components/Portfolio/PortPerfomance'
import PortInstruct from '../components/Portfolio/PortInstruct'
import { balance } from '../config/balance'
import CoinsTable from '../components/CoinsTable';
import { CryptoState } from '../CryptoContext'
import {  
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%", // So that grids 1 & 4 go all the way down
    minHeight: 150, // Give minimum height to a div
    border: "1px solid black",
    fontSize: 30,
    textAlign: "center"
  },
  containerTall: {
    minHeight: 175,
    backgroundImage:`url("data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='brick-wall' fill='%2300fff5' fill-opacity='0.22'%3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    backgroundCcolor: "#000000",
  },
  containerTalla: {
    minHeight: 100 // This div has higher minimum height
  },
  containerTallb: {
    minHeight: 375 // This div has higher minimum height
  },
  containerTallc: {
    minHeight: 400 // This div has higher minimum height
  },
  containerTalld: {
    minHeight: 100 // This div has higher minimum height
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: 120,
    maxHeight: 120,
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

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});


export default function CenteredGrid() {

  const { currency, symbol, coins, loading, fetchCoins } = CryptoState(); 


  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
    <Container>
      <Grid container direction="row" spacing={2}>
        <Grid item container direction="column" xs spacing={2} xs={8}>
          <Grid item xs>
            <div className={clsx(classes.container, classes.containerTalla)}>
            <Typography
                    variant="h6"
                    align="left"
                    style={{ 
                      margin:10, 
                      fontFamily:"Roboto",
                      color:"white"
                    }}
                    >
                    Total Balance
                </Typography>  
                <Grid container spacing={24}>
                  <Grid item md={4}>
                  <PortBalance/>
                  </Grid>
                  <Grid item md={4}>
                  <PortProfit/>
                  </Grid>
                  <Grid item md={4}>
                  <PortPerformance/>
                </Grid> 
                </Grid>      
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
                      color:"white",
                    }}
                    >
                    Trending
                </Typography>
              <PortCarousel>                
              </PortCarousel>
            </div>
          </Grid>
          <Grid item xs>
            <div className={clsx(classes.container, classes.containerTallc)}>
              <Typography
                  variant="h6"
                  align="left"
                  style={{ 
                    margin:10, 
                    fontFamily:"Roboto",
                    color:"white",
                  }}
                  >
                  Statistics
              </Typography>
              <PortChart>
                Chart
              </PortChart>
            </div>
          </Grid>
        </Grid>
        <Grid item container direction="column" xs spacing={2}>
          <Grid item xs>
            <div className={clsx(classes.container, classes.containerTalld)}>
              <PortInstruct>
                Instructions
              </PortInstruct>
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
                      color:"white",
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
    </ThemeProvider>
  );
}
