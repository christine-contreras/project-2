import React, { Component } from 'react'
//routing
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
//components
import Layout from './Layout'
import Home from './Home'
import Details from './Details'

export class Site extends Component {
  constructor(){
    super()
    this.state = {
      user: [],
      id: Math.floor(Math.random() * 1000),
      selectedMovie: [],
      selectedMovieId: [],
      savedMovies: [],
      savedPlaylists: []
    }
  }

  //home functions
  handleMovieSelection = (movie) => {
    const id = movie.id.split('/')
    this.setState({
        selectedMovie: movie,
        selectedMovieId: id[2]
    })
  }

  //details functions
  handleAddMovie = (movie) => {
    const formData = {
        id: this.state.id,
        info: movie
    }
    const configObject = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    }
    fetch('http://localhost:3000/movies', configObject)

    this.setState(prevState => ({
        savedMovies: [...prevState.savedMovies, formData],
        id: prevState.id + 1
    }))
    
  }

  handleRemoveMovie = (removeMovie) => {
    let newMovies = this.state.savedMovies.filter(movie => removeMovie.id !== movie.info.id)

    let deletedMovie = this.state.savedMovies.find(movie => movie.info.id === removeMovie.id)

    fetch(`http://localhost:3000/movies/${deletedMovie.id}`, {
        method: 'DELETE'
    })    

    this.setState({savedMovies: newMovies})
  }


  checkToSeeIfMovieIsSaved = () => {
    if(this.state.savedMovies.length !== 0) {
      let movieSaved = this.state.savedMovies.find(movie => movie.info.id === this.state.selectedMovie.id)

      if(movieSaved === undefined) {
          return false
      } else {
          return true 
      }

    } else {
        return false
    }
}

  componentDidMount() {
      fetch('http://localhost:3000/movies')
      .then(res => res.json())
      .then(json => {
          this.setState({savedMovies: json})
      })

      this.fetchSpotifyApiForUser()
  }

  componentDidUpdate(prevProps, prevState) {
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
                  imageUrl: json.images ?  json.images[0].url : ''
                }
                
            })
        })
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
                  movieIsSaved={this.checkToSeeIfMovieIsSaved()}
                  handleAddMovie={this.handleAddMovie}
                  handleRemoveMovie={this.handleRemoveMovie}/>
              )}/>
            </Switch>
          </Layout>
        </Router>


    )
  }
}

export default Site