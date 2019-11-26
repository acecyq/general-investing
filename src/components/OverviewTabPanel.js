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
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import clsx from "clsx";

const useStyles = makeStyles(({ palette }) => ({
  formControl: {
    backgroundColor: palette.common.white,
    width: "80%"
  },
  header: {
    fontWeight: 600,
    padding: "25px 0 20px 5px"
  },
  leftGridText: {
    fontWeight: 600,
    width: "90%"
  },
  leftGridTitle: {
    color: palette.tertiary.main
  },
  paper: {
    backgroundColor: "rgb(247, 247, 247)",
    display: "flex",
    height: 150
  },
  rightGrid: {
    backgroundColor: "rgb(234, 236, 239)"
  },
  vs: {
    backgroundColor: palette.tertiary.main,
    borderRadius: "50%",
    height: 50,
    marginRight: -25,
    width: 50,
    zIndex: 1
  },
  vsText: {
    color: palette.common.white,
    fontWeight: 600
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
        <Typography className={classes.header} color="primary" variant="h5">
          Portfolio benchmark
        </Typography>

        <Paper className={classes.paper} elevation={0}>
          <Grid container item xs={7} className={classes.leftGrid}>
            <Grid container item xs alignContent="center" justify="center">
              <Typography className={classes.leftGridText} color="primary">
                General investing
              </Typography>
              <br />
              <Typography
                className={clsx(classes.leftGridTitle, classes.leftGridText)}
                variant="h6"
              >
                Stashaway Risk Index 14%
              </Typography>
            </Grid>

            <Grid container item xs alignContent="center" justify="flex-end">
              <Grid
                container
                item
                className={classes.vs}
                alignContent="center"
                justify="center"
              >
                <Typography className={classes.vsText} variant="subtitle1">
                  VS
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            item
            xs={5}
            className={classes.rightGrid}
            alignContent="center"
            justify="center"
          >
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel ref={inputLabel} id="benchmark">
                Which benchmark do you want to compare?
              </InputLabel>

              <Select
                value={benchmark}
                onChange={handleChange}
                input={<OutlinedInput name="age" id="outlined-age-simple" />}
                label="benchmark"
                labelWidth={labelWidth}
              >
                <MenuItem value="ACB">
                  <Typography color="primary">
                    60% stocks (VTSMX ETF) / 40% bonds (VBMFX ETF)
                  </Typography>
                </MenuItem>
                <MenuItem value="AMRN">
                  <Typography color="primary">
                    20% stocks (VTSMX ETF) / 80% bonds (VBMFX ETF)
                  </Typography>
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

OverviewTabPanel.propTypes = {
  benchmark: PropTypes.string.isRequired,
  setBenchmark: PropTypes.func.isRequired
};
