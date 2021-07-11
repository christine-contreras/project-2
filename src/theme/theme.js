import { createTheme } from '@material-ui/core/styles'

//https://material-ui.com/customization/default-theme/#default-theme
//https://material-ui.com/customization/color/#color
const theme = createTheme({
    palette: {
        // type: 'dark',
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
            light: '#ff72d6',
            main: '#f037a5',
            dark: '#b90076',
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
      },
      h4: {
        fontWeight: 600,
        letterSpacing: '-.05em'
      },
      h5: {
        fontWeight: 600,
        letterSpacing: '-.05em'
      },
      h6: {
        fontWeight: 600,
        letterSpacing: '-.05em'
      }
    }
  })

  export default theme