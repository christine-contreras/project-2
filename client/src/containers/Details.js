import React, { Component } from 'react'
import Header from '../components/details/Header'
import Playlist from '../components/details/Playlist'
import Player from '../components/Player'

const api_key = process.env.REACT_APP_IMDB_KEY

const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000)
    var seconds = ((millis % 60000) / 1000).toFixed(0)
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
}


export class Details extends Component {
    state = {
        movieInfo : [],
        albumInfo : [],
        spotifyTracks: [],
        currentSongUris: [],
        playing: false
    }

    fetchMovieApi = () => {
        fetch(`https://imdb8.p.rapidapi.com/title/get-sound-tracks?tconst=${this.props.movieID}`, {
            headers: {
                'x-rapidapi-key': api_key,
                'x-rapidapi-host': 'imdb8.p.rapidapi.com'
            }
        })
        .then(res => res.json())
        .then(json => {
            const validSoundtracks = json.soundtracks.filter(track => ("products" in track))

            let fixTrackTitles = validSoundtracks.map(track => (
                track.name.includes("'") ? {...track, name: track.name.replace(/'/g, ' ')} : track
            ))

            fixTrackTitles = fixTrackTitles.filter(track => ("products" in track))

            

            this.fetchSpotifyApi(fixTrackTitles)

            this.setState({
                movieInfo: json.base,
                albumInfo: json.albums,
            })
        })

    }


    fetchSpotifyApi = (soundtracks) => {

        soundtracks.forEach(track => {
            fetch(`https://api.spotify.com/v1/search?q=track:${track.name.replace(' ', '%20')}%20artist:${track.products[0].artist.replace(' ', '%20')}&type=track&limit=5`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': 'Bearer ' + this.props.spotifyToken
            }
            })
            .then(response => response.json())
            .then(data => {
                let newTrackObject = {}

                if(data.tracks.items.length !== 0) {
                    newTrackObject.name = data.tracks.items[0].name 
                    newTrackObject.artist = data.tracks.items[0].artists[0].name 
                    newTrackObject.id = data.tracks.items[0].uri 
                    newTrackObject.time = millisToMinutesAndSeconds(data.tracks.items[0].duration_ms)
                }

                let newtracks = [...this.state.spotifyTracks, newTrackObject]

                let SpotifyUris = newtracks.map(track => track.id)


                this.setState({
                    spotifyTracks: newtracks,
                    currentSongUris: SpotifyUris

                })

            })

        })
    }

    componentDidMount() {

        this.fetchMovieApi()
        
    }



    handlePlaySong = (spotifyUri) => {
        this.setState({currentSongUris: spotifyUri})
    }

    handlePlaySoundtrack = () => {
        this.setState({playing: true})
    }

    render() {

        const validSoundtracks = this.state.spotifyTracks.filter(track => JSON.stringify(track) !== '{}')
        const validSpotifyUris = this.state.currentSongUris.filter(uri => uri !== undefined)

        return (
            <>
                <div className="flex column padding">
                    <Header
                    movie={this.state.movieInfo}
                    album={this.state.albumInfo}
                    movieIsSaved={this.props.movieIsSaved}
                    handleAddMovie={this.props.handleAddMovie}
                    handleRemoveMovie={this.props.handleRemoveMovie}
                    handlePlaySoundtrack={this.handlePlaySoundtrack}
                    />

                    <Playlist
                    spotifyToken={this.props.spotifyToken}
                    album={this.state.albumInfo}
                    soundtracks={validSoundtracks}
                    handlePlaySong={this.handlePlaySong}
                    />
                </div>
                <Player
                spotifyToken={this.props.spotifyToken}
                currentSongUri={validSpotifyUris}
                playing={this.state.playing}
                />
            </>
            
        )
    }
}

export default Details
