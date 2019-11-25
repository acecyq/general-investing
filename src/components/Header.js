import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import React from "react";

function Header() {
  return (
    <Container>
      <Link>Overview</Link>
      <Typography>General Investing</Typography>
    </Container>
  );
}

export default Header;
