import { Box, Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
// import { CryptoState } from '../../CryptoContext'


const Sell = () => {

    const [asset, setAsset] = useState("")
    const [amount, setAmount] = useState("")
    const [value, setValue] = useState("")        
    
    // const handleSubmit = async () => {
    //     if (!email || !password) {
    //       setAlert({
    //         open: true,
    //         message: "Please fill all the Fields",
    //         type: "error",
    //       });
    //       return;
    //     }
    
    //     try {
    //       const result = await signInWithEmailAndPassword(auth, email, password);
    //       setAlert({
    //         open: true,
    //         message: `Sign Up Successful. Welcome ${result.user.email}`,
    //         type: "success",
    //       });
    //       // console.log(result);
    //       handleClose();
    //     } catch (error) {
    //       setAlert({
    //         open: true,
    //         message: error.message,
    //         type: "error",
    //       });
    //       return;
    //     }
    //   };

    return (
        <Box 
        p={2}
        style={{display:"flex", flexDirection:"column", gap:"20px"}}
        >
        <TextField
            variant="outlined"
            type="Email"
            label="Enter Asset"
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
            fullWidth
        />
        <TextField
            variant="outlined"
            type="Password"
            label="Enter Password"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
        />
        <TextField
            variant="outlined"
            type="Password"
            label="Enter Password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
        />
        <Button
        variant="contained"
        size="large"
        style={{backgroundColor:"#00FFF5"}}
        // onClick={handleSubmit}
        >
        Buy
        </Button> 
        </Box>
    )
}

export default Sell
