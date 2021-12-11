import React, {useState} from 'react';
import { CryptoState } from '../../CryptoContext';
import { balance } from '../../config/balance';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';



function DropDownSelect() {
  const { coins } = CryptoState()  
  const portfolioCoins = balance.map(element => element.id)
  const portfolio = coins.filter(coin => portfolioCoins.includes(coin.id)) 
  // Array of objects containing our fruit data
  console.log(portfolio);
//   let fruits = [
//     { label: "Apple", value: "🍎" },
//     { label: "Banana", value: "🍌" },
//     { label: "Orange", value: "🍊" }
//   ]
//   console.log(fruits);

const useStyles = makeStyles((theme) => ({
    formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    float:"left",
    flexDirection:"left",
    },
    selectEmpty: {
    marginTop: theme.spacing(2),
    },
}));

const classes = useStyles();


// Using state to keep track of what the selected fruit is
let [asset, setAsset] = useState("⬇️ Select a Token ⬇️")

// Using this function to update the state of fruit
// whenever a new option is selected from the dropdown
let handleChange = (e) => {
  setAsset(e.target.value)
}

  return (
    <FormControl 
      className={classes.formControl} 
      align="left"                    
      style={{ 
        margin:10,
        fontFamily:"Roboto",
        color:"#00ADB5"
        }}
      >
        <InputLabel id="demo-simple-select-label">Coin</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={asset}
          onChange={handleChange}
        >
        {portfolio.map((asset) => <option value={asset.name}>{asset.name}</option>)}
        </Select>
      </FormControl>
  );
}

export default DropDownSelect;

