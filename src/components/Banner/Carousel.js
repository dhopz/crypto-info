import { makeStyles } from '@material-ui/core'
import axios from 'axios';
import {React, useEffect, useState} from 'react'
import { CryptoState } from '../../CryptoContext';
import { TrendingCoins } from '../../config/api'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';


const Carousel = () => {
    const [trending, setTrending] = useState([])
    const { currency } = CryptoState()
    
    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));
    
        console.log(data);
        setTrending(data);
      };

    useEffect(() => {
        fetchTrendingCoins();
    }, [currency]);

    const useStyles = makeStyles((theme) => ({
        carousel: {
            height:"50%",
            display:"flex",
            alignItems:"center"
        },
        carouselItem: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            textTransform: "uppercase",
            color: "white",
          },
    }))

    const classes = useStyles();

    const items = trending.map((coin) => {

        return(
            <Link className={classes.carouselItem} to={`/coin/${coin.id}`}>
                <img
                    src={coin?.image}
                    alt={coin.name}
                    height="80"
                    style={{ marginbottom: 10}}
                />           
            </Link>
        )

    })

    const responsive = {
        0: {
            items:2,
        },
        512:{
            items:4,
        },
        }
    

    return (
        <div className={classes.carousel}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                responsive={responsive}
                autoPlay
                items={items}/>
            Carousel
        </div>
    )
}

export default Carousel
