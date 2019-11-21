import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import makeStyles from "@material-ui/styles/makeStyles";
import React from "react";
import OverviewTabPanel from "./OverviewTabPanel";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex"
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const tabs = ["Overview", "Assets", "Projection", "About Portfolio"];

function SATabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container classes={{ root: classes.container }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            {tabs.map((label, index) => (
              <Tab key={label} label={label} {...a11yProps(index)} />
            ))}
          </Tabs>

          <Grid item xs />

          <Button color="inherit">More actions</Button>
        </Container>
      </AppBar>

      <OverviewTabPanel />
    </div>
  );
}

export default SATabs;
