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
  // overrides: {
  //   MuiCssBaseline: {
  //     "@global": {
  //       body: {
  //         scrollbarColor: "#6b6b6b #2b2b2b",
  //         "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
  //           backgroundColor: "#2b2b2b",
  //         },
  //         "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
  //           borderRadius: 8,
  //           backgroundColor: "#6b6b6b",
  //           minHeight: 24,
  //           border: "3px solid #2b2b2b",
  //         },
  //         "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
  //           backgroundColor: "#959595",
  //         },
  //         "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
  //           backgroundColor: "#959595",
  //         },
  //         "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
  //           backgroundColor: "#959595",
  //         },
  //         "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
  //           backgroundColor: "#2b2b2b",
  //         },
  //       },
  //     },
  //   },
  // },
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

const CoinsTable = () => {

    const [search, setSearch] = useState("")
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
    console.log(portfolio);

    useEffect(() => {
        fetchCoins();
    },[currency])

    const handleSearch = () => {
        return coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
      };

    const darkTheme = createTheme({
        palette: {
            primary:{ 
                main:'#fff',
            },
            type: 'dark',
        },
      });

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
                                        {portfolio                           
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
                                                {" "}
                                                {numberWithCommas(row.current_price.toFixed(2))}
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
