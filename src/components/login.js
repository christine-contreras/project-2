import React from 'react'

export default function login(props) {
    return (
        <div>
            <button onClick={props.handleLogin}>Login To Spotify</button>
        </div>
    )
}
