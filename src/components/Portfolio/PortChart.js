import axios from "axios";
import { useEffect, useState } from "react";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { HistoricalChart } from "../../config/api";
import { Line } from "react-chartjs-2";
import TextField from "@material-ui/core/TextField";
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
import { plugins } from "pretty-format";
  
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

const CoinInfo = () => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

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
  }));

  const portfolioCoins = balance.map(element => element.id)
  const [asset, setAsset] = useState(portfolioCoins[0])

  const handleChange = (e) => {
    setAsset(e.target.value)
    fetchHistoricData()
    }
  

  const classes = useStyles();

  console.log(asset);

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(asset, days, currency));

    setHistoricData(data.prices);
  };
   

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days,asset]);

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
                      //backgroundColor: "#00ADB5",                                           
                      label: `Price ( Past ${days} Days ) in ${currency}`,
                      borderColor: "#00ADB5",
                      data: historicData.map((coin) => coin[1]), 
                      fill:true,
                      backgroundColor: "#00ADB5",               
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