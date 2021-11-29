import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Container, Menu, MenuItem, Select } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { Domain } from '@material-ui/icons';
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily:"Roboto",
    fontWeight:"bold" ,
    cursor:"pointer"
  },
}));

const Header = () => {
  const classes = useStyles();
  const navigate =  useNavigate();
  const {currency, setCurrency} = CryptoState() 

  console.log(currency);

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
        <div className={classes.root}>
        <AppBar color= "transparent" position="static">
            <Container>
                <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography onClick={() => navigate("/")} variant="h6" className={classes.title}>
                    Shinchaku Kusari
                </Typography>
                <Select 
                    variant="outlined"
                    style= {{ 
                        width:100,
                        height:40,
                        marginLeft:15,
                    }}
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                     >
                    <MenuItem value={'USD'}>USD</MenuItem>
                    <MenuItem value={'GBP'}>GBP</MenuItem>
                </Select>
                <Button color="inherit">Login</Button>
                </Toolbar>
            </Container>
        </AppBar>
        </div>
    </ThemeProvider>
  );
}

export default Header