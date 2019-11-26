import axios from "axios";
import get from "lodash/get";
import React, { useEffect, useState } from "react";
import Chart from "./components/Chart";
import ChartBar from "./components/ChartBar";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import OverviewTabPanel from "./components/OverviewTabPanel";
import SATabs from "./components/SATabs";
import Spinner from "./components/Spinner";
import { formatLabel } from "./utilities/utilities";

function App() {
  const [aaplData, setAaplData] = useState(null);
  const [benchmark, setBenchmark] = useState("ACB");
  const [benchmarkData, setBenchmarkData] = useState(null);
  const [currency, setCurrency] = useState("USD");
  const [daily, setDaily] = useState({});
  const [factor, setFactor] = useState(null);
  const [labels, setLabels] = useState(null);
  const [loading, setLoading] = useState(false);
  const [monthly, setMonthly] = useState({});
  const [period, setPeriod] = useState("6 months");

  useEffect(() => {
    async function getCurrency() {
      const response = await axios.get("/currency.json");
      // const response = axios.get(
      //   `https://free.currconv.com/api/v7/convert?q=SGD_USD&compact=ultra&apiKey=${REACT_APP_CUR_KEY}`
      // );
      const conversion = get(response, "data.SGD_USD");
      setFactor(conversion);
    }

    if (!factor) {
      getCurrency();
    }

    if (!benchmark || !currency || !period) {
      return;
    }

    function initVariables(period) {
      const day = {
        data: daily,
        dataType: "Time Series (Daily)",
        hasCachedData: !!daily[benchmark],
        setData: setDaily
      };

      const month = {
        data: monthly,
        dataType: "Monthly Adjusted Time Series",
        hasCachedData: !!monthly[benchmark],
        setData: setMonthly
      };

      return ["1 month", "6 months"].includes(period) ? day : month;
    }
    const { data, dataType, hasCachedData, setData } = initVariables(period);

    const apis = [];
    function canFetch(equity) {
      if (hasCachedData) {
        return;
      }

      const url = ["1 month", "6 months"].includes(period)
        ? `/TIME_SERIES_DAILY_ADJUSTED/${equity}.json`
        : `/TIME_SERIES_MONTHLY_ADJUSTED/${equity}.json`;
      // const url = ["1 month", "6 months"].includes(period)
      //   ? `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${equity}&outputsize=full&apikey=${process.env.REACT_APP_API_KEY}`
      //   : `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${equity}&apikey=${process.env.REACT_APP_API_KEY}`;
      apis.push(axios.get(url));
    }

    canFetch("AAPL");
    canFetch(benchmark);

    async function extractData(aaplData, benchmarkData) {
      const aaplDates = Object.keys(aaplData).sort();
      const benchmarkDates = Object.keys(benchmarkData).sort();

      let initDates;
      if (aaplDates.length >= benchmarkDates.length) {
        initDates = benchmarkDates;
      } else {
        initDates = aaplDates;
      }

      let dates;
      switch (period) {
        case "1 month":
          dates = initDates.slice(-30);
          break;
        case "6 months":
          dates = initDates.slice(-180);
          break;
        case "Year-to-date": {
          const thisYear = new Date().getFullYear();
          const regex = new RegExp(`^${thisYear}-01`);

          const index = initDates.findIndex(date => date.match(regex));
          const sliceIndex = -(initDates.length - index);
          dates = initDates.slice(sliceIndex);
          break;
        }
        case "1 year":
          dates = initDates.slice(-13);
          break;
        case "5 years":
          dates = initDates.slice(-61);
          break;
        default:
          dates = initDates;
      }

      setLabels(dates.map(date => formatLabel(date)));
      setAaplData(
        dates.map(date => {
          const amount = Number(aaplData[date]["5. adjusted close"]);

          if (currency === "SGD") {
            return amount * factor;
          }
          return amount;
        })
      );
      setBenchmarkData(
        dates.map(date => {
          const amount = Number(benchmarkData[date]["5. adjusted close"]);

          if (currency === "SGD") {
            return amount * factor;
          }
          return amount;
        })
      );
    }

    async function fetchAll() {
      if (apis.length === 2) {
        await axios.all(apis).then(
          axios.spread(function(aaplRes, benchmarkRes) {
            const aaplDataObj = get(aaplRes, `data[${dataType}]`, {});
            const benchmarkDataObj = get(benchmarkRes, `data[${dataType}]`, {});

            setData(prevState => ({
              ...prevState,
              AAPL: aaplDataObj,
              [benchmark]: benchmarkDataObj
            }));

            extractData(aaplDataObj, benchmarkDataObj);
          })
        );
      } else {
        const aaplDataObj = data.AAPL;
        const benchmarkDataObj = data[benchmark];

        extractData(aaplDataObj, benchmarkDataObj);
      }
    }

    try {
      setLoading(true);
      fetchAll();
    } catch (error) {
      console.log("error fetching daily data", error);
    } finally {
      setLoading(false);
    }

    // eslint-disable-next-line
  }, [benchmark, currency, period]);

  const chartBarProps = {
    currency,
    period,
    setCurrency,
    setPeriod
  };

  const chartProps = {
    aaplData,
    benchmark,
    benchmarkData,
    currency,
    labels,
    loading
  };

  return (
    <div>
      <Spinner loading={loading} />
      <NavBar />
      <Header />
      <SATabs />
      <OverviewTabPanel benchmark={benchmark} setBenchmark={setBenchmark} />
      <ChartBar {...chartBarProps} />
      <Chart {...chartProps} />
    </div>
  );
}

export default App;
