import React, {useEffect, useState } from 'react'
import axios from 'axios'

//theme
import theme from './theme/theme'
import { ThemeProvider, CssBaseline } from '@material-ui/core'

//components
import Login from './components/Login'
import Site from './containers/Site'

// 'URLSearchParams(window.location.search)' will get url string after the '?' & .get() will get the code value from the url
const code = new URLSearchParams(window.location.search).get('code')


export default function App() {
  const [accessToken, setAccessToken] = useState()

  //login to spotify 
  useEffect(() => {
    axios
      .post("http://localhost:8000/login", { code })
      .then((response) => {

        // If success then cut the code string from the URL and execute the other thing
        window.history.pushState({}, null, "/")
        setAccessToken(response.data.accessToken)
      
      })
      .catch((err) => {
        console.log(err)
      })
  }, [code])

  return (
    <ThemeProvider theme={theme}>
      {code ? 
      <Site spotifyToken={accessToken}/> 
      : 
      <Login/>}
    </ThemeProvider>
  )
}