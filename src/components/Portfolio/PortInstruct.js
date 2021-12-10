import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Buy from './Buy';
import Sell from './Sell';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };  

  return (
    <div className={classes.paper}>
              <AppBar 
              position="static"
              style= {{backgroundColor:"transparent", color:"white"}}>
                  <Tabs 
                  value={value} 
                  onChange={handleChange}
                  variant="fullWidth"
                  style={{borderRadius:10}}
                  >
                      <Tab label="Buy"/>                      
                      <Tab label="Sell"/>
                  </Tabs>
              </AppBar>
              {value===0 && <Buy handleClose={handleClose}/>}
              {value===1 && <Sell handleClose={handleClose}/>}

          </div>
  );
}
