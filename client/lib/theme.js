import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import teal from '@material-ui/core/colors/teal';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: green
  },
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     md: 768,
  //     lg: 992,
  //     xl: 1200,
  //     xxl: 1430
  //   }
  // },
  typography: {
    fontFamily: ['-apple-system', 'Microsoft YaHei', 'sans-serif'],
    useNextVariants: true
  }
});

export default theme;
