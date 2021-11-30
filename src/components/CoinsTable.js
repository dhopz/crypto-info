import { Container, createTheme, LinearProgress, TableCell, Table, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';

const CoinsTable = () => {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState()

    const { currency } = CryptoState();


    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency));
        setCoins(data)
        setLoading(false)

    };

    //console.log(coins)

    useEffect(() => {
        fetchCoins();
    },[currency])

    const darkTheme = createTheme({
        palette: {
            primary:{ 
                main:'#fff',
            },
            type: 'dark',
        },
      });

    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign:"center"}}>
                <Typography
                    variant="h4"
                    style={{ margin:18, fontFamily:"Roboto"}}
                    >
                    Cryptocurrency Prices by Market Cap
                </Typography>

                <TextField
                    label="Search for Crypto...." 
                    variant="outlined"
                    style={{marginBottom:20, width:"100%"}}
                    onChange={(e) => setSearch(e.target.value)}
                    />
                    <TableContainer>
                        {
                            loading ? (
                                <LinearProgress style={{background:"#00FFF5"}}></LinearProgress>
                            ) : (
                                <Table>
                                    <TableHead style={{background:"#00ADB5"}}>
                                        <TableRow>
                                        {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                            <TableCell
                                            style={{
                                                color: "black",
                                                fontWeight: "700",
                                                fontFamily: "Roboto",
                                            }}
                                            key={head}
                                            align={head === "Coin" ? "" : "right"}
                                            >
                                            {head}
                                            </TableCell>
                                        ))}
                                        </TableRow> 
                                    </TableHead>
                                    
                                </Table>
                            )
                        }
                    </TableContainer>
            </Container>        
        </ThemeProvider>
        
    )
}

export default CoinsTable
