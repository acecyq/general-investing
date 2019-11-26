import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/styles/makeStyles";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(() => ({
  button: {
    fontWeight: 300,
    textTransform: "none"
  }
}));

function NavButton({ children }) {
  const classes = useStyles();

  return (
    <Button className={classes.button} color="inherit">
      {children}
    </Button>
  );
}

export default NavButton;

NavButton.propTypes = {
  children: PropTypes.string
};

NavButton.defaultProps = {
  children: ""
};
