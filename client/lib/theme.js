import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';
import cyan from '@material-ui/core/colors/cyan';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: grey
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
