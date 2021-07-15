import React, { Component } from 'react'
//theme
import theme from './theme/theme'
import { ThemeProvider, CssBaseline } from '@material-ui/core'


//components
import Login from './components/Login'
import Site from './containers/Site'

// 'URLSearchParams(window.location.search)' will get url string after the '?' & .get() will get the code value from the url
const code = new URLSearchParams(window.location.search).get('code')

export class App extends Component {

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {code ? 
        <Site spotifyToken={code}/> 
        : 
        <Login/>}
     </ThemeProvider>


    )
  }
}

export default App