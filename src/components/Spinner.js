import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import React from "react";

function Spinner() {
  return (
    <Backdrop open={true}>
      <CircularProgress />
    </Backdrop>
  );
}

export default Spinner;
