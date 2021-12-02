import { Box, Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { CryptoState } from '../../CryptoContext'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from "firebase/auth"

const Signup = ({handleClose}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const {setAlert} = CryptoState();

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
          setAlert({
            open: true,
            message: "Passwords do not match",
            type: "error",
          });
          return;
        }
    
        try {
          const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          setAlert({
            open: true,
            message: `Sign Up Successful. Welcome ${result.user.email}`,
            type: "success",
          });
    
          handleClose();
        } catch (error) {
          setAlert({
            open: true,
            message: error.message,
            type: "error",
          });
          return;
        }
      };


    return (
        <Box 
        p={3}
        style={{display:"flex", flexDirection:"column", gap:"20px"}}
        >
        <TextField
            variant="outlined"
            type="Email"
            label="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
        />
        <TextField
            variant="outlined"
            type="Password"
            label="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
        />
        <TextField
            variant="outlined"
            type="Password"
            label="Enter Password"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
            fullWidth
        />
        <Button
        variant="contained"
        size="large"
        style={{backgroundColor:"#00FFF5"}}
        onClick={handleSubmit}
        >
        Sign Up
        </Button>  


        </Box>
    )
}

export default Signup
