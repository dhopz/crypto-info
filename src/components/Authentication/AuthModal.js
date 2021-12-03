import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { AppBar, Button, Tab, Tabs, Box } from '@material-ui/core';
import Login from './Login';
import Signup from './Signup';
import GoogleButton from "react-google-button";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width:400,
    backgroundColor: theme.palette.background.paper,
    color:"white",
    borderRadius:10,
  },
  google: {
    padding: 24,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 20,
    fontSize: 20,
  },
}));

export default function AuthModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(0);
  const signInWithGoogle = () => {

  }

  const handleChange = (event, newValue) => {
      setValue(newValue);
  }
    

  return (
    <div>
      <Button 
      variant="contained"
      style={{
          width:85,
          height:40,
          marginLeft:15,
          backgroundColor:"#00FFF5"
      }}
      onClick={handleOpen}
      >
          Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
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
                      <Tab label="Login"/>
                      <Tab label="Sign Up"/>
                  </Tabs>
              </AppBar> 

              {value===0 && <Login handleClose={handleClose}/>}
              {value===1 && <Signup handleClose={handleClose}/>}
              <Box className={classes.google}>
              <span>OR</span>
              <GoogleButton 
              style={{ width: "100%", outline: "none" }}
              onClick={signInWithGoogle}/>
              </Box>          
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
