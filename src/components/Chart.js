import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { useEffect } from "react";
import { Chart as chart, defaults, Line } from "react-chartjs-2";
import { dateToString } from "../utilities/utilities";
import PropTypes from "prop-types";
import makeStyles from "@material-ui/styles/makeStyles";

defaults.global.animation = false;
defaults.global.elements.point.pointStyle = "line";

const dataDefaults = {
  fill: false,
  lineTension: 0.1,
  borderJoinStyle: "miter",
  borderWidth: 3,
  pointBorderWidth: 1,
  pointHoverRadius: 0,
  pointHoverBorderWidth: 0,
  pointRadius: 1,
  pointHitRadius: 10,
  showLine: true,
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
    fontColor: "white",
    fullWidth: true,
    usePointStyle: true
  },
  position: "bottom"
};

function options(currency) {
  return {
    scales: {
      xAxes: [
        {
          gridLines: {
            drawBorder: true,
            drawOnChartArea: false
          },
          ticks: {
            fontColor: "white"
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            color: "rgba(234, 236, 239, 0.8)",
            drawBorder: false,
            zeroLineColor: "rgba(234, 236, 239, 0.8)"
          },
          stacked: true,
          ticks: {
            callback: function(value) {
              return value + ",000";
            },
            fontColor: "white"
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: "white",
      bodyAlign: "right",
      bodyFontColor: "rgb(9,32,56)",
      callbacks: {
        beforeTitle: function() {
          return " ";
        },
        label: function(tooltipItem, data) {
          const label = data.datasets[tooltipItem.datasetIndex].label || "";

          return label;
        },
        afterLabel: function(tooltipItem) {
          const afterLabel = `$${Math.round(tooltipItem.yLabel * 100) /
            100} ${currency}
        `;

          return afterLabel;
        }
      },
      mode: "index",
      titleAlign: "right",
      titleFontColor: "rgb(9,32,56)",
      titleMarginBottom: 20
    }
  };
}

const useStyles = makeStyles(({ palette }) => ({
  afterChart: {
    width: "46%"
  },
  description: {
    color: "rgba(234, 236, 239, 0.8)"
  },
  header: {
    color: "rgba(234, 236, 239, 0.8)",
    fontWeight: 600
  },
  paper: {
    backgroundColor: palette.primary.main,
    padding: 30
  },
  text: {
    paddingBottom: 25
  }
}));

function Chart({
  aaplData,
  benchmark,
  benchmarkData,
  currency,
  labels,
  loading
}) {
  const classes = useStyles();

  useEffect(() => {
    chart.pluginService.register({
      afterDraw: function(chart) {
        if (chart.tooltip._active && chart.tooltip._active.length) {
          const activePoint = chart.controller.tooltip._active[0];
          const ctx = chart.ctx;
          const x = activePoint.tooltipPosition().x;
          const topY = chart.scales["y-axis-0"].top;
          const bottomY = chart.scales["y-axis-0"].bottom + 20;

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, topY);
          ctx.lineTo(x, bottomY);
          ctx.lineWidth = 1;
          ctx.strokeStyle = "rgb(103, 186, 221)";
          ctx.stroke();
          ctx.restore();
        }
      }
    });
  }, []);

  if (loading || !labels || !aaplData || !benchmarkData) {
    return <div />;
  }

  const data = {
    labels,
    datasets: [
      {
        ...dataDefaults,
        label: "StashAway Risk Index 14%",
        borderColor: "rgb(102, 179, 214)",
        pointBackgroundColor: "rgb(102, 179, 214)",
        pointBorderColor: "rgb(102, 179, 214)",
        pointHoverBorderColor: "rgb(102, 179, 214)",
        data: aaplData
      },
      {
        ...dataDefaults,
        label: labelMapping[benchmark],
        borderColor: "rgb(226, 181, 92)",
        pointBackgroundColor: "rgb(226, 181, 92)",
        pointBorderColor: "rgb(226, 181, 92)",
        pointHoverBorderColor: "rgb(226, 181, 92)",
        data: benchmarkData
      }
    ]
  };

  return (
    <Container>
      <Paper className={classes.paper}>
        <div className={classes.text}>
          <Typography className={classes.header} gutterBottom variant="h5">
            Portfolio value based on gross returns
          </Typography>
          <Typography className={classes.description}>
            Gross returns and exchange rates sourced from Bloomberg as of{" "}
            {dateToString()}
          </Typography>
        </div>

        <Line data={data} legend={legend} options={options(currency)} />

        <Grid container>
          <Grid className={classes.afterChart} item></Grid>

          <Grid container item xs direction="column">
            <Typography className={classes.description} variant="caption">
              VTSMX Vanguard Total Stock Market Index
            </Typography>
            <Typography className={classes.description} variant="caption">
              VTBMX Vanguard Total Bond Market Index
            </Typography>
          </Grid>
        </Grid>
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
