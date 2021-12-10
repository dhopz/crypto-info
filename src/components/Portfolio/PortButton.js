import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
  style: {
    border: "1px solid #00FFF5",
    alignItems:"left",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Roboto",
    cursor: "pointer",
    backgroundColor: "#00ADB5",
    fontWeight: 700,
    color: "black",
    maxWidth: '30px', 
    maxHeight: '30px', 
    minWidth: '80px', 
    minHeight: '30px'
    
  },
});

export default function PortButton() {
  const classes = useStyles();
  
  return (    
        <Button className={classes.deposit}>
          Deposit
        </Button>
      
    
  );
}
