import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "rgb(255, 255, 255)"
    },
    primary: {
      main: "rgb(9,32,56)"
    },
    secondary: {
      main: "rgb(55, 173, 169)"
    },
    tertiary: {
      main: "rgb(68, 121, 206)"
    }
  }
});

export default theme;
