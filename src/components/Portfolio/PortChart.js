import axios from "axios";
import { useEffect, useState } from "react";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { HistoricalChart } from "../../config/api";
import { Line } from "react-chartjs-2";
import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import SelectButton from "../SelectButton"
import { chartDays } from "../../config/data";
import { CryptoState } from '../../CryptoContext'
import { balance } from '../../config/balance';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
  } from 'chart.js';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
);

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [age, setAge] = useState('');
  const [days, setDays] = useState(1);
  const { currency, coins } = CryptoState();

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "100%",
      
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
      padding: 10,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
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

  const portfolioCoins = balance.map(element => element.id)
  const portfolio = coins.filter(coin => portfolioCoins.includes(coin.id))    

  //console.log(portfolio);

  const classes = useStyles();

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(portfolioCoins[0], days, currency));

    setHistoricData(data.prices);
  };

//   console.log(coin);

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  

  return (
    <ThemeProvider theme={darkTheme}> 
    {/* <img
        src={portfolio[0]?.image}
        alt={portfolio[0].name}
        height="40"
        style={{ borderBottom:"none" }}
    />
    <div
        style={{ display: "flex", flexDirection: "column", borderBottom:"none", align:"left"}}
    >
        <span
        style={{
            textTransform: "uppercase",
            fontSize: 15,
            borderBottom:"none"                                                                                                  
        }}
        >
        {portfolio[0].symbol}
        </span>
        <span style={{ color: "darkgrey", borderBottom:"none", fontSize:12 }}>
        {portfolio[0].name}
        </span> 
      </div>     */}
      {/* <Typography
        variant="body2"
        align="left"
        style={{ 
          margin:10,
          marginBottom:5,
          fontFamily:"Roboto",
        }}
        >
          <img
            src={portfolio[0]?.image}
            alt={portfolio[0].name}
            height="20"
            style={{ borderBottom:"none" }}
          />
        {portfolio[0].name}
      </Typography>   */}
      <FormControl 
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
      </FormControl>
        <div className={classes.container}>
          {!historicData ? (
            <CircularProgress
              style={{ color: "#00FFF5" }}
              size={250}
              thickness={1}
            />
          ) : (
            <>
              <Line
                data={{
                  labels: historicData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.toLocaleDateString();
                  }),

                  datasets: [
                    {                    
                      label: `Price ( Past ${days} Days ) in ${currency}`,
                      borderColor: "#00ADB5",
                      data: historicData.map((coin) => coin[1]),                  
                    },
                  ],
                }}
                options={{
                  elements: {
                    point: {
                      radius: 1,
                    },
                  },
                }}
              />
              <div
                style={{
                  size:"small",
                  display: "flex",
                  fontSize:12,
                  marginTop: 20,
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                {chartDays.map((day) => (
                  <SelectButton                  
                    key={day.value}
                    onClick={() => setDays(day.value)}
                    selected={day.value === days}
                  >
                    {day.label}
                  </SelectButton>
                ))}
              </div>
            </>
          )}
        </div>
      </ThemeProvider>
  );
};

export default CoinInfo;