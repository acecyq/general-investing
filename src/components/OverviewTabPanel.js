import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import makeStyles from "@material-ui/styles/makeStyles";
import React, { useRef, useState } from "react";

const useStyles = makeStyles(theme => ({
  formControl: {
    width: "80%"
  },
  paper: {
    display: "flex"
  }
}));

function OverviewTabPanel() {
  const classes = useStyles();

  const inputLabel = useRef(null);

  const [benchmark, setBenchmark] = useState("");

  function handleChange({ target }) {
    setBenchmark(target.value);
  }

  return (
    <div>
      <Container>
        <Typography>Portfolio benchmark</Typography>

        <Paper className={classes.paper} elevation={0}>
          <Grid item xs={6}>
            <Typography component="div">
              <p>General investing</p>
              <p>Stashaway Risk Index 14%</p>
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel ref={inputLabel} htmlFor="benchmark">
                Which benchmark do you want to compare?
              </InputLabel>

              <Select
                value={benchmark}
                onChange={handleChange}
                input={<OutlinedInput name="age" id="outlined-age-simple" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

export default OverviewTabPanel;
