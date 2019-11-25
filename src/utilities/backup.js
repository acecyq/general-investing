// useEffect(() => {
//   async function fetchDailyData() {
//     const response = await axios.get(
//       "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT&apikey=demo"
//     );

//     if (response.status !== 200) {
//       throw response;
//     }
//     const dataSeries = get(response, "data[Time Series (Daily)]", {});
//     const sortedDates = Object.keys(dataSeries)
//       .sort()
//       .slice(-30);

//     if (!sortedDates.length) {
//       return;
//     }
//     setLabels(
//       sortedDates.map(date => {
//         // date is a string in the format yyyy-mm-dd
//         const attributes = date.split("-");

//         return formatLabel(
//           new Date(
//             Number(attributes[0]),
//             Number(attributes[1]) - 1,
//             Number(attributes[2]) - 1
//           )
//         );
//       })
//     );
//     setDaily(sortedDates.map(date => dataSeries[date]["5. adjusted close"]));
//   }

//   try {
//     if (!benchmark || !currency || !period || !!daily.length) {
//       return;
//     }
//     fetchDailyData();
//   } catch (error) {
//     console.log("error fetching daily data", error);
//   }
// }, [benchmark, currency, period, daily]);
