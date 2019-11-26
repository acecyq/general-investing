import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Line } from "react-chartjs-2";
import { dateToString } from "../utilities/utilities";
import PropTypes from "prop-types";

const dataDefaults = {
  fill: false,
  lineTension: 0.1,
  borderJoinStyle: "miter",
  borderWidth: 3,
  pointBorderColor: "rgba(75,192,192,1)",
  pointBackgroundColor: "#fff",
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: "rgba(75,192,192,1)",
  pointHoverBorderColor: "rgba(220,220,220,1)",
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
  spanGaps: true
};

const labelMapping = {
  ACB: "60% stocks (VTSMX ETF) / 40% bonds (VBMFX ETF)",
  AMRN: "20% stocks (VTSMX ETF) / 80% bonds (VBMFX ETF)"
};

const legend = {
  display: true,
  labels: {
    boxWidth: 20,
    fontColor: "black"
  },
  position: "bottom"
};

function Chart({ aaplData, benchmark, benchmarkData, labels, loading }) {
  if (loading || !labels || !aaplData || !benchmarkData) {
    return <div />;
  }

  const data = {
    labels,
    datasets: [
      {
        ...dataDefaults,
        label: "StashAway Risk Index 14%",
        borderColor: "blue",
        data: aaplData
      },
      {
        label: labelMapping[benchmark],
        borderColor: "red",
        data: benchmarkData
      }
    ]
  };

  return (
    <Container>
      <Typography>Portfolio value based on gross returns</Typography>
      <Typography>
        Gross returns and exchange rates sourced from Bloomberg as of{" "}
        {dateToString()}
      </Typography>

      <Paper>
        <Line data={data} legend={legend} />
      </Paper>
    </Container>
  );
}

export default Chart;

Chart.propTypes = {
  aaplData: PropTypes.array,
  benchmark: PropTypes.string,
  benchmarkData: PropTypes.array,
  labels: PropTypes.array,
  loading: PropTypes.bool
};

Chart.defaultProps = {
  aaplData: [],
  benchmark: "",
  benchmarkData: [],
  labels: [],
  loading: false
};
