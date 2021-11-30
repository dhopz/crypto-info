import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel';

const useStyles = makeStyles(() => ({
    banner:{
        backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='199' viewBox='0 0 100 199'%3E%3Cg fill='%2300fff5' fill-opacity='0.15'%3E%3Cpath d='M0 199V0h1v1.99L100 199h-1.12L1 4.22V199H0zM100 2h-.12l-1-2H100v2z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E")`,
        backgroundCcolor: "#000000",  
    } ,
    bannerContent:{
        height:400,
        display:'flex',
        flexDirection:"column",
        paddingTop:25,
        justifyContent:"space-around",
    },
    tagline:{
        display:"flex",
        height:"40%",
        flexDirection:"column",
        justifyContent:"center",
        textAlign:"center"
    }    

}))


const Banner = () => {
    const classes = useStyles();

    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.tagline}>
                    <Typography
                    variant="h2"
                    style={{
                        fontWeight:"bold",
                        marginBottom:15,
                        fontFamily:"Roboto",
                    }}
                    >
                        Coins Shinchaku
                    </Typography>
                    <Typography
                    variant="subtitle2"
                    style={{
                        color:"#00ADB5",
                        textTransform:"capitalize",
                        fontFamily:"Roboto",
                    }}
                    >
                        Get your Crypto Information 
                    </Typography>
                </div>
                <Carousel/>

                
            </Container>            
        </div>
    )
}

export default Banner