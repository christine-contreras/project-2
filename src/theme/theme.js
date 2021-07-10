import { createTheme } from '@material-ui/core/styles'
import { pink, teal } from '@material-ui/core/colors';

//https://material-ui.com/customization/default-theme/#default-theme
//https://material-ui.com/customization/color/#color
const theme = createTheme({
    palette: {
      // primary: {
      //   main: '#7cb342'
      // },
      primary: teal,
      //specifies main, light and dark
      secondary: pink
    },
    typography: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeightBold: 600,
      h1: {
        fontWeight: 600
      },
      h2: {
        fontWeight: 600
      }
    }
  })

  export default theme