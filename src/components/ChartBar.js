import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/styles/makeStyles";
import React from "react";
import SelectButton from "./SelectButton";

const useStyles = makeStyles(({ palette, spacing }) => ({
  appBar: {
    backgroundColor: palette.common.white,
    textTransform: "none"
  },
  container: {
    display: "flex"
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function ChartBar({ currency, daily, period, setCurrency, setPeriod }) {
  const classes = useStyles();

  function handleCurrency(value) {
    setCurrency(value);
  }

  function handlePeriod(value) {
    setPeriod(value);
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Container classes={{ root: classes.container }}>
          <SelectButton control={period} onClick={handlePeriod}>
            1 month
          </SelectButton>
          <SelectButton control={period} onClick={handlePeriod}>
            6 months
          </SelectButton>
          <SelectButton control={period} onClick={handlePeriod}>
            Year-to-date
          </SelectButton>
          <SelectButton control={period} onClick={handlePeriod}>
            1 year
          </SelectButton>
          <SelectButton control={period} onClick={handlePeriod}>
            5 years
          </SelectButton>
          <SelectButton control={period} onClick={handlePeriod}>
            Max
          </SelectButton>

          <Grid item xs />

          <SelectButton control={currency} onClick={handleCurrency}>
            SGD
          </SelectButton>
          <SelectButton control={currency} onClick={handleCurrency}>
            USD
          </SelectButton>
        </Container>
      </AppBar>
    </div>
  );
}

export default ChartBar;
