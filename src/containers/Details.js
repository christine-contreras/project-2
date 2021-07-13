import React, { Component } from 'react'
import Header from '../components/details/Header'
import Playlist from '../components/details/Playlist'

const api_key = process.env.REACT_APP_IMDB_KEY

export class Details extends Component {
    state = {
        movieInfo : [],
        albumInfo : [],
        soundtracks: []
    }

    componentDidMount() {
        fetch(`https://imdb8.p.rapidapi.com/title/get-sound-tracks?tconst=${this.props.movieID}`, {
            headers: {
                'x-rapidapi-key': api_key,
                'x-rapidapi-host': 'imdb8.p.rapidapi.com'
            }
        })
        .then(res => res.json())
        .then(json => {
            this.setState({
                movieInfo: json.base,
                albumInfo: json.albums,
                soundtracks: json.soundtracks
            })
        })
    }

    render() {
        return (
            <div className="flex column">
                <Header movie={this.state.movieInfo} album={this.state.albumInfo}/>
                <Playlist album={this.state.albumInfo} soundtracks={this.state.soundtracks}/>
            </div>
        )
    }
}

export default Details
