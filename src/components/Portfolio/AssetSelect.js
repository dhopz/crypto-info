import React, {useState} from 'react';
import { CryptoState } from '../../CryptoContext';
import { balance } from '../../config/balance';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";


function DropDownSelect() {
    const { coins } = CryptoState()  
    const portfolioCoins = balance.map(element => element.id)
    const portfolio = coins.filter(coin => portfolioCoins.includes(coin.id))   

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

    const [asset, setAsset] = React.useState(portfolio[0]['name'])

    const handleChange = (e) => {
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
            {/* <InputLabel id="demo-simple-select-label">Coin</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={portfolio[0]}
            value={asset}
            onChange={handleChange}
            >
            {portfolio.map((asset) => <option value={asset.name}>{asset.name}</option>)}
            </Select> */}
            <div>
            <TextField
            id="asset-select"
            select
            label="Asset"
            value={asset}
            onChange={handleChange}
            helperText="Please select Item from Portfolio"
            SelectProps={{
                renderValue: (value) => value
            }}
            >
            {portfolio.map((asset) => (
                <MenuItem key={asset.name} value={asset.symbol}>
                {asset.symbol} {asset.name}
                </MenuItem>
            ))}
            </TextField>
        </div>
        </FormControl>
    );
    }

export default DropDownSelect;

