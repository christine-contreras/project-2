import { createTheme } from '@material-ui/core/styles'

//https://material-ui.com/customization/default-theme/#default-theme
//https://material-ui.com/customization/color/#color
const theme = createTheme({
    palette: {
        type: 'dark',
        background: {
            default: '#212121'
        },
        primary: {
            light: '#ffff96',
            main: '#cdf564',
            dark: '#99c231',
            contrastText: '#000',
          },
          secondary: {
            light: '#edffff',
            main: '#baede1',
            dark: '#89baaf',
            contrastText: '#000',
          },
    },
    typography: {
      fontFamily: "Helvetica, Arial, sans-serif",
      fontWeightBold: 600,
      h1: {
        fontWeight: 600,
        letterSpacing: '-.05em'
      },
      h2: {
        fontWeight: 600,
        letterSpacing: '-.05em'
      },
      h3: {
        fontWeight: 600,
        letterSpacing: '-.05em'
      }
    }
  })

  export default theme