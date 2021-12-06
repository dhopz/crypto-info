import React from 'react';
import { createTheme, makeStyles, ThemeProvider, Typography } from '@material-ui/core';
import PortfolioPie from '../components/PortfolioPie';

const Portfolio = () => {
  
  const useStyles = makeStyles((theme) => ({ 
    container:{
      display:"flex",
      [theme.breakpoints.down("md")]:{
        flexDirection:"column",
        alignItems:"center",
      },
    },
    sidebar:{
      width:"30%",
      [theme.breakpoints.down("md")]: {
        width:"100%"
      },
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      marginTop:25,
      borderRight:"2px solid grey",
    },
    heading:{
      flexGrow: 1,
      color:"#00FFF5",
      fontFamily:"Roboto",
      fontWeight:"bold",
      marginBottom:20, 
    },
    description:{
      width:"100%",
      fontFamily:"Roboto",
      padding:25,
      paddingBottom:15,
      paddingTop:0,
      textAlign:"justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
    
  }));
  const classes = useStyles();
  
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <div className = {classes.container}>
      <div className = {classes.sidebar}>
        <Typography variant="h3" className={classes.heading}>
          Portfolio
        </Typography>

        <Typography variant="subtitle1" className={classes.description}>
          More Information
        </Typography>

        <Typography
                variant="h5"
                style={{
                  fontFamily:"Roboto", 
                }}
                >
                  Portfolio Performance
                </Typography>

        <Typography
        variant="h6"
        style={{
          fontFamily:"Roboto", 
        }}
        >
          Portfolio Performance
        </Typography>

        <PortfolioPie>
          Portfolio
        </PortfolioPie>
    </div>
  </div>
       
  )
}

export default Portfolio
