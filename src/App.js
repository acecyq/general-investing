import axios from "axios";
import get from "lodash/get";
import React, { useEffect, useState } from "react";
import Chart from "./components/Chart";
import ChartBar from "./components/ChartBar";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import OverviewTabPanel from "./components/OverviewTabPanel";
import SATabs from "./components/SATabs";

function App() {
  const [benchmark, setBenchmark] = useState("ACB");
  const [currency, setCurrency] = useState("SGD");
  const [daily, setDaily] = useState({});
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [monthly, setMonthly] = useState({});
  const [period, setPeriod] = useState("6 months");

  useEffect(() => {
    const apis = [];

    async function canFetch(equity) {
      const hasCachedData =
        period === "1 month" ? !!daily[equity] : !!monthly[equity];

      if (hasCachedData) {
        return;
      }

      const timeSeries =
        period === "1 month"
          ? "TIME_SERIES_DAILY_ADJUSTED"
          : "TIME_SERIES_MONTHLY_ADJUSTED";

      apis.push(axios.get(`/${equity}.json`));
      // axios.get(
      //   `https://www.alphavantage.co/query?function=${timeSeries}&symbol=${equity}&apikey=${process.env.API_KEY}`
      // );

      // if (response.status !== 200) {
      //   throw response;
      // }
      // const dataSeries = get(response, `data[${dataType}]`, {});
      // debugger;
      // if (period === "1 month") {
      //   debugger;
      //   setDaily({
      //     ...daily,
      //     [equity]: dataSeries
      //   });
      // } else {
      //   debugger;
      //   setMonthly({
      //     ...monthly,
      //     [equity]: dataSeries
      //   });
      // }
    }

    canFetch("AAPL");
    canFetch(benchmark);

    const dataType =
      period === "1 month"
        ? "Daily Adjusted Time Series"
        : "Monthly Adjusted Time Series";

    // function fetchAll() {
    //   axios.all(apis).then(
    //     axios.spread(function(aaplRes, benchmarkRes) {
    //       const aaplData = get(aaplRes, `data[${dataType}]`, {});
    //       const benchmarkData = get(benchmarkRes, `data[${dataType}]`, {});

    //       if (period === "1 month") {
    //         setDaily({
    //           ...daily,
    //           AAPL: aaplData,
    //           [equity]: dataSeries
    //         });
    //       } else {
    //         setMonthly({
    //           ...monthly,
    //           [equity]: dataSeries
    //         });
    //       }
    //     })
    //   );
    // }

    try {
      if (!benchmark || !currency || !period) {
        return;
      }
      // fetchAll();
    } catch (error) {
      console.log("error fetching daily data", error);
    }
  }, [benchmark, currency, period]);

  const chartBarProps = {
    currency,
    period,
    setCurrency,
    setPeriod
  };

  return (
    <div>
      <NavBar />
      <Header />
      <SATabs />
      <OverviewTabPanel benchmark={benchmark} setBenchmark={setBenchmark} />
      <ChartBar {...chartBarProps} />
      <Chart daily={daily} labels={labels} />
    </div>
  );
}

export default App;
