import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { dateToString } from "../utilities/utilities";
import Spinner from "./Spinner";

const legend = {
  display: true,
  fullWidth: true,
  labels: {
    fontColor: "black"
  },
  position: "bottom"
};

function Chart({ daily, labels }) {
  const [loading, setLoading] = useState(false);

  const data = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
    datasets: [
      {
        label: "StashAway Risk Index 14%",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [10, undefined, undefined, 12, 13, undefined, 11, undefined]
      },
      {
        label: "Testing",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [15, 16, 15, 14, 15, 17, 16, 18]
      }
    ]
  };

  // if (!loading && (!daily.length || !labels.length)) {
  //   return <div />;
  // }

  return (
    <div>
      <Container>
        {loading && <Spinner />}

        {!loading && (
          <div>
            <Typography>Portfolio value based on gross returns</Typography>
            <Typography>
              Gross returns and exchange rates sourced from Bloomberg as of{" "}
              {dateToString()}
            </Typography>

            <Paper>
              <Line data={data} legend={legend} />
            </Paper>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Chart;
