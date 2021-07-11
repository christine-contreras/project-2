import React, { Component } from 'react'
//theme
import theme from './theme/theme'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
//routing
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
//components
import Login from './components/Login'
import Home from './containers/Home'
import Layout from './containers/Layout'
//Spotify API
import Spotify from 'spotify-web-api-js'
const spotifyApi = new Spotify()
const client_id = process.env.REACT_APP_SPOTIFY_ID
const redirect_uri = 'http://localhost:3000/home'; // Your redirect uri
const scopes = ['user-read-private', 'user-read-email', 'user-read-playback-state', 'user-read-recently-played', 'user-top-read', 'playlist-modify-public', 'playlist-modify-private', 'user-library-modify', 'playlist-read-private', 'user-library-read']
const scopesUrl = scopes.join('%20')


export class App extends Component {
  constructor(){
    super()

    this.state = {
      params: {},
      loggedIn: false,
    }

    if(this.state.params.access_token) {
      spotifyApi.setAccessToken(this.state.params.access_token)
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  handleLogin = () => {
    window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=&${scopesUrl}&response_type=token&show_dialog-true`
  }

  componentDidMount() {
    if(window.location.hash) {
      this.setState({
        params: this.getHashParams(),
        loggedIn: true
      })
    }
    

  }


  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Layout loggedIn={this.state.loggedIn} spotifyToken={this.state.params.access_token}>
            <Switch>
              <Route exact path="/" render={() => <Login handleLogin={this.handleLogin}/>}/>
            </Switch>
            <Switch>
              <Route exact path='/home' render={() => <Home />}/>
            </Switch>
          </Layout>
        </Router>
        
     </ThemeProvider>


    )
  }
}

export default App