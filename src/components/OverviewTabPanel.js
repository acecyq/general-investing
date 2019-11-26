import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import React, { useEffect, useRef } from "react";

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: 20
  },
  formControl: {
    width: "80%"
  },
  header: {
    fontWeight: 600
  },
  leftGrid: {
    backgroundColor: "rgb(247, 247, 247)"
  },
  leftGridText: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  paper: {
    display: "flex"
  },
  rightGrid: {
    backgroundColor: "rgb(234, 236, 239)"
  }
}));

function OverviewTabPanel({ benchmark, setBenchmark }) {
  const classes = useStyles();

  const inputLabel = useRef(null);

  const [labelWidth, setLabelWidth] = React.useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  function handleChange({ target }) {
    setBenchmark(target.value);
  }

  return (
    <div className={classes.container}>
      <Container>
        <Typography className={classes.header} color="primary" variant="h6">
          Portfolio benchmark
        </Typography>

        <Paper className={classes.paper} elevation={0}>
          <Grid container item xs={7} className={classes.leftGrid}>
            <Typography className={classes.leftGridText}>
              <p>General investing</p>
              <p>Stashaway Risk Index 14%</p>
            </Typography>
          </Grid>

          <Grid container item xs={5} className={classes.rightGrid}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel ref={inputLabel} id="benchmark">
                Which benchmark do you want to compare?
              </InputLabel>

              <Select
                input={<OutlinedInput name="age" id="outlined-age-simple" />}
                label="benchmark"
                labelWidth={labelWidth}
                onChange={handleChange}
                value={benchmark}
              >
                <MenuItem value="ACB">
                  60% stocks (VTSMX ETF) / 40% bonds (VBMFX ETF)
                </MenuItem>
                <MenuItem value="AMRN">
                  20% stocks (VTSMX ETF) / 80% bonds (VBMFX ETF)
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

export default OverviewTabPanel;
