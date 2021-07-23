import React, { Component } from 'react'
import Header from '../components/details/Header'
import Playlist from '../components/details/Playlist'
import Player from '../components/Player'
import AddToPlaylistModal from '../components/details/AddToPlaylistModal'
import SuccessModal from '../components/details/SuccessModal'

const api_key = process.env.REACT_APP_IMDB_KEY

const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000)
    var seconds = ((millis % 60000) / 1000).toFixed(0)
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
}


export class Details extends Component {
    state = {
        // movieInfo : [],
        albumInfo : [],
        spotifyTracks: [],
        currentSongUris: [],
        playing: false,
        usersPlaylists: [],
        addToPlaylist: false,
        createPlaylist: false,
        successMessage: false,
        selectedPlaylist: null
    }

    componentDidMount() {
        this.fetchMovieApi() 
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

            

            this.fetchSpotifyApiForSoundtracks(fixTrackTitles)

            this.setState({
                // movieInfo: json.base,
                albumInfo: json.albums,
            })
        })

    }


    fetchSpotifyApiForSoundtracks = (soundtracks) => {

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

    
    //header actions
    handlePlaySong = (spotifyUri) => {
        this.setState({currentSongUris: spotifyUri})
    }

    handlePlaySoundtrack = () => {
        this.setState({playing: true})
    }


    handleGetPlaylistsFromSpotify = () => {
        fetch('https://api.spotify.com/v1/me/playlists?limit=50', {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': 'Bearer ' + this.props.spotifyToken
            }
        })
        .then(response => response.json())
        .then(json => {
            let playlists = json.items.filter(item => item.owner.display_name === this.props.user.name)

            this.setState({
                usersPlaylists: playlists,
                addToPlaylist: true
            })
        })
    }

    //model actions
    handleCloseModal = () => {
        this.setState({
            addToPlaylist: false,
            successMessage: false
        })
    }

    handleAddSongsToPlaylist = (playlist) => {

        let validSpotifyUris = this.state.currentSongUris.filter(uri => uri !== undefined)

        validSpotifyUris = validSpotifyUris.join()

        fetch(`${playlist.href}/tracks?uris=${validSpotifyUris}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': 'Bearer ' + this.props.spotifyToken
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(`songs added to playlist: ${data}`)
            this.setState({
                addToPlaylist: false,
                successMessage: true,
                selectedPlaylist: playlist
            })
        })
    }

    handleCreateNewPlaylist = () => {
        fetch(`https://api.spotify.com/v1/users/${this.props.user.id}/playlists`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': 'Bearer ' + this.props.spotifyToken
            },
            body: JSON.stringify({
                "name": this.props.movie.info.title,
                "description": `${this.props.movie.info.title} soundtracks`,
                "public": false
              })
        })
        .then(response => response.json())
        .then(playlist => {
            this.handleAddSongsToPlaylist(playlist)

        })
    }


    render() {

        const validSoundtracks = this.state.spotifyTracks.filter(track => JSON.stringify(track) !== '{}')
        const validSpotifyUris = this.state.currentSongUris.filter(uri => uri !== undefined)

        return (
            <>
                <div className="flex column padding">
                    <Header
                    movie={this.props.movie}
                    album={this.state.albumInfo}
                    movieIsSaved={this.props.movieIsSaved}
                    handleAddMovie={this.props.handleAddMovie}
                    handleRemoveMovie={this.props.handleRemoveMovie}
                    handlePlaySoundtrack={this.handlePlaySoundtrack}
                    handleGetPlaylistsFromSpotify={this.handleGetPlaylistsFromSpotify}
                    handleCreateNewPlaylist={this.handleCreateNewPlaylist}
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
                

                {this.state.addToPlaylist ? 
                <AddToPlaylistModal
                handleCloseModal={this.handleCloseModal} 
                handleAddSongsToPlaylist={this.handleAddSongsToPlaylist}
                playlists={this.state.usersPlaylists}
                
                /> 
                : null}

                {this.state.successMessage ? 
                <SuccessModal
                message="Playlist Ready"
                handleCloseModal={this.handleCloseModal} 
                playlist={this.state.selectedPlaylist}
                /> 
                : null}     

            </>
            
        )
    }
}

export default Details
