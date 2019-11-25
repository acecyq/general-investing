import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/styles/makeStyles";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    textTransform: "none"
  }
}));

function SelectButton({ children, control, onClick }) {
  const classes = useStyles();

  const variant = control === children ? "contained" : "text";

  function handleClick() {
    onClick(children);
  }

  return (
    <Button
      classes={{ root: classes.root }}
      color="primary"
      onClick={handleClick}
      variant={variant}
    >
      {children}
    </Button>
  );
}

export default SelectButton;

SelectButton.propTypes = {
  children: PropTypes.string,
  control: PropTypes.string,
  onClick: PropTypes.func
};

SelectButton.defaultProps = {
  children: "",
  control: "",
  onClick: () => {}
};
