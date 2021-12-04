import React from 'react';
import {Pie, Doughnut} from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
Chart.register(ArcElement);

const PortfolioPie = () => {
  const state = {
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: [
          '#00FFF5',
          '#C9DE00',
          '#2FDE00',
          '#00A6B4',
          '#6800B4'
        ],
        hoverBackgroundColor: [
        '#501800',
        '#4B5000',
        '#175000',
        '#003350',
        '#35014F'
        ],
        data: [65, 59, 80, 81, 56]
      }
    ]
  }
  const useStyles = makeStyles((theme) => ({
    container: {
      width: "450px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "50%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

  const plugins = [{
    beforeDraw: function(chart) {
     var width = chart.width,
         height = chart.height,
         ctx = chart.ctx;
         ctx.fillStyle = "#00FFF5";
         ctx.restore();
         var fontSize = (height / 200).toFixed(2);
         ctx.font = fontSize + "em sans-serif";
         ctx.textBaseline = "middle";
         var text = "Value",
         textX = Math.round((width - ctx.measureText(text).width) / 2),
         textY = height / 2;
         ctx.fillText(text, textX, textY);
         ctx.save();
    } 
  }]
  
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
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>  
        <Doughnut
            data={state}            
            options={{
              cutout:"80%",
            }}
            plugins={plugins}
          />
            
      </div>
    </ThemeProvider>  
   
  )
}

export default PortfolioPie
