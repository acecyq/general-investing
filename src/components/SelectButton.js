import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/styles/makeStyles";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(({ palette }) => ({
  contained: {
    backgroundColor: palette.secondary.main
  },
  root: {
    minWidth: 50,
    padding: "6px 12px",
    textTransform: "none"
  },
  text: ({ variant }) => ({
    color:
      variant === "contained" ? palette.common.white : palette.secondary.main,
    fontSize: 13
  })
}));

function SelectButton({ children, control, onClick }) {
  const variant = control === children ? "contained" : "text";

  const classes = useStyles({ variant });

  function handleClick() {
    onClick(children);
  }

  return (
    <Button
      classes={{ root: classes.root, contained: classes.contained }}
      color="secondary"
      onClick={handleClick}
      variant={variant}
    >
      <Typography className={classes.text} color="inherit">
        {children}
      </Typography>
    </Button>
  );
}

export default SelectButton;

SelectButton.propTypes = {
  children: PropTypes.string.isRequired,
  control: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
