import React, { Component } from 'react'
//routing
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
//components
import Layout from './Layout'
import Home from './Home'
import Details from './Details'


export class Site extends Component {
  constructor(){
    super()
    this.state = {
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
        savedMovies: [...prevState.savedMovies, movie]
    }))
  }

  handleRemoveMovie = (deleteMovie) => {
    let newMovies = this.state.savedMovies.filter(movie => deleteMovie !== movie)
    this.setState({savedMovies: newMovies})

    const configObject = {
        method: 'PUT',
        headers: {
        'content-type': 'application/json'
        },
        body: JSON.stringify(this.state.savedMovies)
    }

    fetch('http://localhost:3000/movies', configObject)
  }

  componentDidMount() {
      fetch('http://localhost:3000/movies')
      .then(res => res.json())
      .then(json => {
          this.setState({savedMovies: json})
      })
  }



  render() {
    //if undefined: movie isn't saved (false) : movie already saved (true)
    let checkMovie = this.state.savedMovies.find(movie => movie.id === this.state.selectedMovie.id)

    return (
        <Router>
          <Layout spotifyToken={this.props.spotifyToken}>
            <Switch>
              <Route exact path="/home" render={() => <Home handleMovieSelection={this.handleMovieSelection}/>}/>
            </Switch>
            <Switch>
              <Route exact path='/movie-details' render={() => (
                  <Details
                  movieID={this.state.selectedMovieId}
                  movieIsSaved={checkMovie === undefined ? false : true}
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