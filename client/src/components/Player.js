import React, {useState, useEffect} from 'react'
import '../css/Player.css'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function Player(props) {
    const [play, setPlay] = useState(true)

    useEffect(() => setPlay(true), [props.currentSongUri])

    return (
        <div className="player">
            {props.playing ? 
            <SpotifyPlayer
            token={props.spotifyToken}
            showSaveIcon
            play={play}
            callback={state => {
                if (!state.isPlaying) setPlay(false)
            }}
            uris={props.currentSongUri.length !== 0 ? props.currentSongUri : []}

            styles={{
                activeColor: '#ff72d6',
                bgColor: '#292929',
                color: '#fff',
                loaderColor: '#fff',
                sliderColor: '#ff72d6',
                trackArtistColor: '#ccc',
                trackNameColor: '#fff',
              }}
            />
            : null
            }
            
        </div>
    )
}
