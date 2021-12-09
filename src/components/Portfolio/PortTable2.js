import { Container, createTheme, LinearProgress, TableCell, Table, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, TableBody, makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CryptoState } from '../../CryptoContext'
import { useNavigate } from 'react-router-dom';
import MuiTableCell from "@material-ui/core/TableCell";
import { withStyles } from '@material-ui/styles';
import { balance } from '../../config/balance';

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

const theme = createTheme({  
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

const CoinsTable = () => {

    
    const { currency, symbol, coins, loading, fetchCoins } = CryptoState();

    const useStyles = makeStyles({
        row: {
          backgroundColor: "#16171a",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#393E46",
          },
          fontFamily: "Roboto",
        },
      });
    
    const TableCell = withStyles({
      root: {
        borderBottom: "none"
      }
    })(MuiTableCell);

    const classes = useStyles();
    const navigate = useNavigate();

    const portfolioCoins = balance.map(element => element.id)
    const portfolio = coins.filter(coin => portfolioCoins.includes(coin.id))    
    const updatedPortfolio = portfolio.map(v => ({ ...v, ...balance.find(sp => sp.id === v.id) }));

    console.log(portfolioCoins[0]);

  
    useEffect(() => {
        fetchCoins();
    },[currency])


    return (
        <ThemeProvider theme={theme}>
            <Container style={{ textAlign:"center"}}>                

                
                    <TableContainer style={{ maxHeight: 350 }}>
                        {
                            loading ? (
                                <LinearProgress style={{background:"#00FFF5"}}></LinearProgress>
                            ) : (
                                <Table>                                    

                                    <TableBody>
                                        {updatedPortfolio                           
                                        .map((row) => {                                            
                                            return (
                                            <TableRow
                                                onClick={() => navigate(`/coins/${row.id}`)}
                                                className={classes.row}
                                                key={row.name}
                                            >
                                                <TableCell
                                                component="th"
                                                scope="row"
                                                style={{
                                                    display: "flex",
                                                    gap: 15,
                                                    borderBottom:"none"
                                                }}
                                                >
                                                <img
                                                    src={row?.image}
                                                    alt={row.name}
                                                    height="40"
                                                    style={{ borderBottom:"none" }}
                                                />
                                                <div
                                                    style={{ display: "flex", flexDirection: "column", borderBottom:"none"}}
                                                >
                                                    <span
                                                    style={{
                                                        textTransform: "uppercase",
                                                        fontSize: 15,
                                                        borderBottom:"none"                                                                                                  
                                                    }}
                                                    >
                                                    {row.symbol}
                                                    </span>
                                                    <span style={{ color: "darkgrey", borderBottom:"none" }}>
                                                    {row.name}
                                                    </span>
                                                </div>
                                                </TableCell>
                                                <TableCell>                                                  
                                                </TableCell>
                                                <TableCell 
                                                align="right"
                                                style={{                                    
                                                  gap: 15,
                                                  borderBottom:"none"
                                                }}>
                                                  <div
                                                    style={{ display: "flex", flexDirection: "column", borderBottom:"none"}}
                                                  >
                                                    <span
                                                    style={{
                                                        textTransform: "uppercase",
                                                        fontSize: 15,
                                                        borderBottom:"none"                                                                                                  
                                                    }}
                                                    >     
                                                    {numberWithCommas((row.current_price * row.units).toFixed(2))}
                                                    </span> 
                                                    <span style={{ color: "darkgrey", borderBottom:"none" }}>
                                                    {row.units.toFixed(4)}
                                                    </span>
                                                  </div>
                                                </TableCell>                                           
                                                
                                            </TableRow>
                                            );
                                        })
                                      }
                                    </TableBody>

                                </Table>
                            )
                        }
                    </TableContainer>

                    
            </Container>        
        </ThemeProvider>
        
    )
}

export default CoinsTable
