import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/styles/makeStyles";
import React from "react";
import NavButton from "./NavButton";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex"
  },
  root: {
    flexGrow: 1
  },
  logo: {
    height: 80
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar elevation={0} position="static">
        <Container classes={{ root: classes.container }}>
          <Grid className={classes.logo} container item alignItems="center" xs>
            <img src="stashaway.png" alt="StashAway logo" height={40} />
          </Grid>

          <Grid item xs />

          <NavButton>Home</NavButton>
          <NavButton>Manage Deposit</NavButton>
          <NavButton>Refer a friend</NavButton>
          <NavButton>Support Oliver</NavButton>
        </Container>
      </AppBar>
    </div>
  );
}

export default NavBar;
