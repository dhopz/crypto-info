import React from 'react';
import clsx from 'clsx';
import { getAuth } from '@firebase/auth'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { CryptoState } from '../../CryptoContext';
import { Avatar } from '@material-ui/core';
import { signOut } from '@firebase/auth';
import { numberWithCommas } from "../CoinsTable";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from '@firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  container:{
    width:350,
    padding:25,
    height:"100%",
    display:"flex",
    flexDirection:"column",
    fontFamily:"monospace",
  },
  profile: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "92%",
  },
  picture: {
    width: 100,
    height: 100,
    cursor: "pointer",
    backgroundColor: "#00FFF5",
    objectFit: "contain",
  },
  logout: {
    height: "5%",
    width: "100%",
    backgroundColor: "#00ADB5",
    marginTop: 20,
  },
  portfolio: {
    height: "5%",
    width: "100%",
    backgroundColor: "#00ADB5",
    marginTop: 20,
  },
  watchlist: {
    flex: 1,
    width: "100%",
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 15,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflowY: "scroll",
  },
  coin: {
    padding: 10,
    borderRadius: 5,
    color: "black",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#00ABD8",
    boxShadow: "0 0 3px black",
  },
});

export default function UserSidebar() {
  const classes = useStyles();
  const auth = getAuth();
  const [state, setState] = React.useState({
    right: false,
  });


  const { user,setAlert, watchlist, coins, symbol } = CryptoState()

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successfull!",
    });

    toggleDrawer();
  };

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  

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
              <Button
                variant="contained"
                className={classes.portfolio}>
                  <Link to="/portfolio" style={{ color:"black", fontFamily:"Roboto" }}>Portfolio</Link>
              </Button>
              <div className={classes.watchlist}>
                  <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    Watchlist
                  </span>
                  {coins.map((coin) => {
                    if (watchlist.includes(coin.id))
                      return (
                        <div className={classes.coin}>
                          <span>{coin.name}</span>
                          <span style={{ display: "flex", gap: 8 }}>
                            {symbol}{" "}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <AiFillDelete
                              style={{ cursor: "pointer" }}
                              fontSize="16"
                              onClick={() => removeFromWatchlist(coin)}
                            />
                          </span>
                        </div>
                      );
                    else return <></>;
                  })}
              </div>
              <Button
                variant="contained"
                className={classes.logout}
                onClick={logOut}
              >
                Log Out
              </Button>
              </div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
