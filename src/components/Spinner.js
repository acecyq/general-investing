import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "@material-ui/core/Modal";
import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  modal: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center"
  }
}));

function Spinner({ loading }) {
  const classes = useStyles();

  return (
    <Modal className={classes.modal} open={loading}>
      <CircularProgress />
    </Modal>
  );
}

export default Spinner;

Spinner.propTypes = {
  loading: PropTypes.bool.isRequired
};
