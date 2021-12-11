import React, {useState} from 'react';
import { balance } from '../../config/balance';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";


function DropDownSelect() { 
    const portfolioCoins = balance.map(element => element.id)

    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            float:"left",
            flexDirection:"left",
        },
    }));

    const classes = useStyles();

    const [asset, setAsset] = useState(portfolioCoins[0])

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
                {portfolioCoins.map((asset) => (
                    <MenuItem key={asset} value={asset}>
                    {asset}
                    </MenuItem>
                ))}
                </TextField>
            </div>
        </FormControl>
    );
    }

export default DropDownSelect;

