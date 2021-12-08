import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    backgroundColor: "transparent",
    border: "none", 
    boxShadow: "none",
    minWidth: 275,
    align:"left",
    textAlign: 'left',
    justifyContent: 'left',
    alignContent: 'left',
    padding: '30px',
  
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },  
});

export default function SimpleCard() {
  const classes = useStyles();
  
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} align="left" color="textSecondary" gutterBottom>
          My Balance
        </Typography>
        <Typography variant="h4" component="h2" align="left">
          10,000.00
        </Typography>
      </CardContent>
    </Card>
    
  );
}
