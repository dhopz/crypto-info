import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { CryptoState } from '../../CryptoContext';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles({
  container:{
    width:350,
    padding:25,
    height:"100%",
    display:"flex",
    flexDirection:"column",
    fontFamily:"monospace",
  }
});

export default function UserSidebar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });


  const { user } = CryptoState()

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
    </div>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
            <Avatar 
            onClick={toggleDrawer(anchor, true)}
            style={{
                height:38,
                width:38,
                marginLeft:15,
                cursor:"pointer",
                backgroundColor:"#00FFF5"
            }} 
            src={user.photoURL}
            alt={user.displayName||user.email}
            />                  
          <Drawer 
            anchor={anchor} 
            open={state[anchor]} 
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={classes.container}>
              <div className={classes.profile}>
              <Avatar
              className={classes.picture}
              src={user.photoURL}
              alt={user.displayName||user.email}
              />
              <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
              >
                {user.displayName||user.email}
              </span>
              </div>

            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
