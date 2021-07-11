import { TimerSharp } from '@material-ui/icons'
import React, { Component } from 'react'
import Search from '../components/home/Search'
const api_key = process.env.REACT_APP_IMDB_KEY

export class Home extends Component {
    state = {
        movies: []
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
            const movieList = json.results.filter(movie => movie.titleType === "movie")
            this.setState({
                movies: movieList
            })
        })
    }
    
    render() {
        return (
            <div className="flex">
                <Search handleSearch={this.handleSearch}/>
            </div>
        )
    }
}

export default Home
