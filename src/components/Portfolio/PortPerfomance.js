import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    align:"left",
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    padding: '30px'
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
    <Card className={classes.root} style={{backgroundColor: "transparent"}}>
      <CardContent>
        <Typography className={classes.title} align="left" color="textSecondary" gutterBottom>
          Performance
        </Typography>
        <Typography variant="h5" component="h2" align="left">
          10%
        </Typography>
        <Typography variant="body2" component="p" align="left">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
    </Card>
    
  );
}
