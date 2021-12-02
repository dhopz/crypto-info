import { Box, Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'

const Signup = ({handleClose}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")

    const handleSubmit = () => {}


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
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
        />
        <TextField
            variant="outlined"
            type="Password"
            label="Enter Password"
            value={confirmPassword}
            onChange={(e) => setEmail(e.target.value)}
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
