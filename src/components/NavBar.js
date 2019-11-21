import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import makeStyles from "@material-ui/styles/makeStyles";
import React from "react";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex"
  },
  root: {
    flexGrow: 1
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
      <AppBar position="static">
        <Container classes={{ root: classes.container }}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Grid item xs />

          <Button color="inherit">Home</Button>
          <Button color="inherit">Manage Deposit</Button>
          <Button color="inherit">Refer a friend</Button>
          <Button color="inherit">Support Oliver</Button>
        </Container>
      </AppBar>
    </div>
  );
}

export default NavBar;
