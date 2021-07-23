import React, { Component } from 'react'
import Search from '../components/home/Search'
import Results from '../components/home/Results'
const api_key = process.env.REACT_APP_IMDB_KEY

export class Home extends Component {
    state = {
        movies: [],
        id: Math.floor(Math.random() * 1000),
    }

    handleSearch = (search) => {
        fetch(`https://imdb8.p.rapidapi.com/title/find?q=${search}`, {
            headers: {
                'x-rapidapi-key': api_key,
                'x-rapidapi-host': 'imdb8.p.rapidapi.com'
            }
        })
        .then(res => res.json())
        .then(json => {
            
            let movieList = json.results.filter(movie => movie.titleType === "movie" && ("image" in movie))

            let newMovieList = []

            movieList.forEach(movie => {
                let newMovieObject = {}
                newMovieObject.id = this.state.id
                newMovieObject.info = movie

                newMovieList.push(newMovieObject)

                this.setState(prevState => {
                    return {
                        id: prevState.id + 1
                    }
                })
            })

            this.setState({
                movies: newMovieList,
            })
        })
    }
    
    render() {
        return (
            <div className="flex column">
                <Search handleSearch={this.handleSearch}/>
                <Results handleMovieSelection={this.props.handleMovieSelection} movies={this.state.movies}/>
            </div>
        )
    }
}

export default Home
