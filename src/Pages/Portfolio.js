import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import PortfolioPie from '../components/PortfolioPie';
import CoinsTable from '../components/CoinsTable';
import Carousel from '../components/Banner/Carousel';
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%", // So that grids 1 & 4 go all the way down
    minHeight: 150, // Give minimum height to a div
    border: "1px solid black",
    fontSize: 30,
    textAlign: "center"
  },
  containerTall: {
    minHeight: 250 // This div has higher minimum height
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
  const classes = useStyles();

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs>
        <div className={classes.container}>1</div>
      </Grid>
      <Grid item container direction="column" xs spacing={2}>
        <Grid item xs>
          <div className={classes.container}>2</div>
        </Grid>
        <Grid item xs>
          <div className={clsx(classes.container, classes.containerTall)}>
            3
          </div>
        </Grid>
      </Grid>
      <Grid item xs>
        <div className={classes.container}>4</div>
      </Grid>
    </Grid>
  );
}
