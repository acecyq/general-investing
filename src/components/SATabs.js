import AppBar from "@material-ui/core/AppBar";
import ButtonBase from "@material-ui/core/ButtonBase";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import makeStyles from "@material-ui/styles/makeStyles";
import React from "react";

const useStyles = makeStyles(({ palette }) => ({
  container: {
    display: "flex"
  },
  indicator: {
    backgroundColor: palette.text.primary
  },
  root: {
    backgroundColor: palette.background.paper,
    flexGrow: 1
  },
  selected: {
    color: palette.text.primary
  },
  tab: {
    textTransform: "none",
    minWidth: 0
  }
}));

function a11yProps(index) {
  return {
    id: `portfolio-views`,
    "aria-controls": `portfolio-views-${index}`
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
            aria-label="portfolio views"
            TabIndicatorProps={{ className: classes.indicator }}
          >
            {tabs.map((label, index) => (
              <Tab
                classes={{ root: classes.tab, selected: classes.selected }}
                key={label}
                label={label}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>

          <Grid item xs />

          <ButtonBase className={classes.button} color="inherit">
            <Typography
              className={classes.link}
              component="span"
              variant="subtitle1"
            >
              More actions
            </Typography>
            <ExpandMoreIcon />
          </ButtonBase>
        </Container>
      </AppBar>
    </div>
  );
}

export default SATabs;
