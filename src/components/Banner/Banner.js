import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(() => ({
    banner:{
        backgroundImage: "url(./architect.svg)",        
    } ,
    bannerContent:{
        height:400,
        display:'flex',
        flexDirection:"column",
        paddingTop:25,
        justifyContent:"space-around",
        fill:'#00FFF5',
        fillOpacity:'0.23'
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
                        color:"darkgrey",
                        textTransform:"capitalize",
                        fontFamily:"Roboto",
                    }}
                    >
                        Get your Crypto Information
                    </Typography>
                </div>

                
            </Container>            
        </div>
    )
}

export default Banner