import React, {useState} from 'react';
import { CryptoState } from '../../CryptoContext';
import { balance } from '../../config/balance';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


function DropDownSelect() {
  const { coins } = CryptoState()  
  const portfolioCoins = balance.map(element => element.id)
  const portfolio = coins.filter(coin => portfolioCoins.includes(coin.id)) 
  // Array of objects containing our fruit data
  console.log(portfolio);
  let fruits = [
    { label: "Apple", value: "🍎" },
    { label: "Banana", value: "🍌" },
    { label: "Orange", value: "🍊" }
  ]
  console.log(fruits);


// Using state to keep track of what the selected fruit is
let [asset, setAsset] = useState("⬇️ Select a Token ⬇️")

// Using this function to update the state of fruit
// whenever a new option is selected from the dropdown
let handleFruitChange = (e) => {
  setAsset(e.target.value)
}

  return (
    <div className="App">
    {/* Displaying the value of fruit */}
    {asset}
    <br />

    <select onChange={handleFruitChange}> 
      <option value=""> -- Select Portfolio Asset -- </option>
            {/* Mapping through each fruit object in our fruits array
          and returning an option element with the appropriate attributes / values.
         */}
      {portfolio.map((asset) => <option value={asset.name}>{asset.name}</option>)}
    </select>
    </div>
  );
}

export default DropDownSelect;

{/* <FormControl 
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
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl> */}