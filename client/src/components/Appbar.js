import React, { useEffect, useState } from "react"
import '../css/Appbar.css'
import { AppBar, Toolbar, Typography, Avatar } from '@material-ui/core'

import useAuth from '../useAuth'
import SpotifyWebApi from 'spotify-web-api-node'

const id = process.env.REACT_APP_SPOTIFY_ID

const spotifyApi = new SpotifyWebApi({
  clientId: id,
});

export default function Appbar({ spotifyToken }) {
    const accessToken = useAuth(spotifyToken)
    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        if (!accessToken) return;
    
        // Setting Up the spotifyApi with AccessToken so that we can use its functions anywhere in the component without setting AccessToken value again & again. 
        spotifyApi.setAccessToken(accessToken);
    
        // Get user details with help of getMe() function
        spotifyApi.getMe().then(data => {
          setName(data.body.display_name)
          setImageUrl(data.body.images[0].url)
        })
      }, [accessToken]);

    return (
        <AppBar className="appbar" color="inherit" elevation={1}>
            <Toolbar className="toolbar">
                
                <Avatar className="avatar"
                src={imageUrl}/>
                <Typography>
                    {name}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}