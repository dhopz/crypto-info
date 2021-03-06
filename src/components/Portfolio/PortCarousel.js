import { makeStyles } from '@material-ui/core'
import axios from 'axios';
import {React, useEffect, useState} from 'react'
import { CryptoState } from '../../CryptoContext';
import { TrendingCoins } from '../../config/api'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { numberWithCommas } from '../CoinsTable';


const Carousel = () => {
    const [trending, setTrending] = useState([])
    const { currency, symbol } = CryptoState()
    
    
    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));
    
        //console.log(data);
        setTrending(data);
      };

    useEffect(() => {
        fetchTrendingCoins();
    }, [currency]);

    const useStyles = makeStyles((theme) => ({
        carousel: {
            height:"40%",
            display:"flex",
            alignItems:"center",
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

        let profit = coin?.price_change_percentage_24h >= 0;

        return (
            <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
              <img
                src={coin?.image}
                alt={coin.name}
                height="60"
                style={{ marginBottom: 10 }}
              />
              <span
               style={{
                 fontSize:14,
               }}>
                {coin?.symbol}
                &nbsp;
                <span
                  style={{
                    color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                    fontWeight: 500,
                    fontSize:12,
                  }}
                >
                  {profit && "+"}
                  {coin?.price_change_percentage_24h?.toFixed(2)}%
                </span>
              </span>
              <span style={{ fontSize: 12, fontWeight: 500 }}>
                {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
              </span>
            </Link>
          );
        });
      

    const responsive = {
        0: {
            items:2,
        },
        512:{
            items:6,
        },
        }
    

    return (
        <div className={classes.carousel}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={2000}
                animationDuration={2000}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}/>
                
        </div>
    )
}

export default Carousel
