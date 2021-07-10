import './App.css';
import React, { Component } from 'react'
import Spotify from 'spotify-web-api-js'

const spotifyApi = new Spotify()

// https://accounts.spotify.com/authorize?client_id=5fe01282e94241328a84e7c5cc169164&redirect_uri=http:%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&response_type=token&state=123
const client_id = process.env.REACT_APP_SPOTIFY_ID
const redirect_uri = 'http://localhost:3001/webapp'; // Your redirect uri
const scopes = ['user-read-private', 'user-read-email', 'user-read-playback-state', 'user-read-recently-played', 'user-top-read', 'playlist-modify-public', 'playlist-modify-private', 'user-library-modify', 'playlist-read-private', 'user-library-read']
const scopesUrl = scopes.join('%20')


export class App extends Component {
  constructor(){
    super()
    //const params = this.getHashParams()

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

  getNowPlaying = () => {
    // spotifyApi.getMyCurrentPlaybackState()
    // .then(console.log)

    // spotifyApi.getPlaylist()
    // .then(console.log)

    const params = this.getHashParams()
    const token = params.access_token

    // fetch('https://api.spotify.com/v1/me/playlists?limit=30', {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json",
    //     'Authorization': 'Bearer ' + token
    //   }
    // })
    // .then(response => response.json())
    // .then(console.log)

    // fetch("https://api.spotify.com/v1/playlists/4zmRxWJGA7YHDrJMK8Oc0d", {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json",
    //     'Authorization': 'Bearer ' + token
    //   }
    // })
    // .then(response => response.json())
    // .then(console.log)

    // fetch("https://api.spotify.com/v1/me/top/tracks", {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json",
    //     'Authorization': 'Bearer ' + token
    //   }
    // })
    // .then(response => response.json())
    // .then(console.log)

    // fetch("https://api.spotify.com/v1/audio-analysis/6tDDoYIxWvMLTdKpjFkc1B", {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json",
    //     'Authorization': 'Bearer ' + token
    //   }
    // })
    // .then(response => response.json())
    // .then(console.log)


    // fetch("https://api.spotify.com/v1/audio-features/6tDDoYIxWvMLTdKpjFkc1B", {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json",
    //     'Authorization': 'Bearer ' + token
    //   }
    // })
    // .then(response => response.json())
    // .then(console.log)
    

    fetch("https://movies-tvshows-data-imdb.p.rapidapi.com/?type=get-movies-by-title&title=the%20lion%20king", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "d2d88ccfe9msheaed69bb3dee452p14e3d0jsn57791266e6c4",
		"x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com"
	}
    })
    .then(reponse => reponse.json())
    .then(console.log)
    .catch(err => {
      console.error(err);
    });


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
      <div className="App">
        {/* <a href="http://localhost:8888/">Login to Spotify</a> */}

        {/* <div>Now Playing: { this.state.nowPlaying.name } </div> */}
        <div>
          {/* <img src={this.state.nowPlaying.image } style={{width: '100%'}} /> */}
        </div>
        {/* <button onClick={this.getNowPlaying}>Check Now Playing</button> */}
        <button onClick={this.handleLogin}>Login To Spotify</button>
     </div>


    )
  }
}

export default App