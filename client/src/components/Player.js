import React, {useState} from 'react'
import '../css/Player.css'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function Player({spotifyToken, currentSongUri, playing}) {
    const [play, setPlay] = useState(true)

    return (
        <div className="player">
            {playing ? 
            <SpotifyPlayer
            token={spotifyToken}
            showSaveIcon
            play={play}
            callback={state => {
                if (!state.isPlaying) setPlay(false)
            }}
            uris={currentSongUri.length !== 0 ? currentSongUri : []}

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
