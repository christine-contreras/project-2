import React, { Component } from 'react'
//routing
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
//components
import Layout from './Layout'
import Home from './Home'
import Details from './Details'
import Movies from './Movies'

export class Site extends Component {
  constructor(){
    super()
    this.state = {
      user: [],
      selectedMovie: [],
      selectedMovieId: [],
      savedMovies: [],
      savedPlaylists: []
    }
  }

  componentDidMount() {
    //fetch saved movies from server
    fetch('http://localhost:3000/movies')
    .then(res => res.json())
    .then(savedMovies => {
        this.setState({savedMovies})
    })

    //fetch spotify for User Info
    this.fetchSpotifyApiForUser()
}

componentDidUpdate(prevProps, prevState) {
  //make sure to fill in user info if it didn't populate previously
  if (this.state.user !== prevState.user) {
    this.fetchSpotifyApiForUser()
  }
}

fetchSpotifyApiForUser = () => {
  fetch('https://api.spotify.com/v1/me', {
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              'Authorization': 'Bearer ' + this.props.spotifyToken
          }
      })
      .then(response => response.json())
      .then(json => {
          this.setState({
              user: {
                name: json.display_name,
                imageUrl: json.images ?  json.images[0].url : '',
                id: json.id,
              }
              
          })
      })
}

  //home functions
  handleMovieSelection = (movie) => {
    const id = movie.info.id.split('/')
    this.setState({
        selectedMovie: movie,
        selectedMovieId: id[2]
    })
  }


  //details functions
  handleAddMovieToSavedMovies = (movie) => {
    const configObject = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(movie)
    }
    fetch('http://localhost:3000/movies', configObject)

    this.setState(prevState => ({
        savedMovies: [...prevState.savedMovies, movie],
        // id: prevState.id + 1
    }))
    
  }

  handleRemoveMovieFromSavedMovies = (removeMovie) => {
    let newMovies = this.state.savedMovies.filter(movie => removeMovie.info.id !== movie.info.id)

    let deletedMovie = this.state.savedMovies.find(movie => movie.info.id === removeMovie.info.id)

    fetch(`http://localhost:3000/movies/${deletedMovie.id}`, {
        method: 'DELETE'
    })    

    this.setState({savedMovies: newMovies})
  }


  checkToSeeIfMovieIsSaved = () => {
    if(this.state.savedMovies.length !== 0) {
      let movieSaved = this.state.savedMovies.find(movie => movie.info.id === this.state.selectedMovie.info.id)

      if(movieSaved === undefined) {
          return false
      } else {
          return true 
      }

    } else {
        return false
    }
}

  render() {
    return (
        <Router>
          <Layout user={this.state.user}>
            <Switch>
              <Route exact path="/home" render={() => <Home handleMovieSelection={this.handleMovieSelection}/>}/>
            </Switch>
            <Switch>
              <Route exact path='/movie-details' render={() => (
                  <Details
                  user={this.state.user}
                  spotifyToken={this.props.spotifyToken}
                  movieID={this.state.selectedMovieId}
                  movie={this.state.selectedMovie}
                  movieIsSaved={this.checkToSeeIfMovieIsSaved()}
                  handleAddMovie={this.handleRemoveMovieFromSavedMovies}
                  handleRemoveMovie={this.handleRemoveMovie}/>
              )}/>
            </Switch>

            <Switch>
              <Route exact path='/movies' render={() => (
                  <Movies
                  handleMovieSelection={this.handleMovieSelection}
                  />
              )}/>
            </Switch>
          </Layout>
        </Router>


    )
  }
}

export default Site