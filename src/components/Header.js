import Container from "@material-ui/core/Container";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles(({ palette }) => ({
  button: {
    margin: "10px 0"
  },
  container: {
    backgroundColor: palette.primary.main
  },
  header: {
    color: palette.common.white,
    fontWeight: 800,
    paddingBottom: 15,
    paddingLeft: 5
  },
  icon: {
    height: 22
  },
  link: {
    fontWeight: 600
  }
}));

function Header() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Container>
        <ButtonBase className={classes.button} color="inherit">
          <ArrowBackIcon className={classes.icon} />
          <Typography className={classes.link} component="span">
            Overview
          </Typography>
        </ButtonBase>

        <Typography className={classes.header} variant="h4">
          General Investing
        </Typography>
      </Container>
    </div>
  );
}

export default Header;
