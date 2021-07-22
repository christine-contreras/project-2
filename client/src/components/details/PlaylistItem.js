import React from 'react'
import '../../css/PlaylistItem.css'
import { Card, CardMedia, CardContent, CardActions, Button, Typography } from '@material-ui/core'

export default function PlaylistItem(props) {
    return (
        <Card className="flex">
            <div className="playlist-media">
                <CardMedia
                image={props.playlist.images[0].url}
                title={props.playlist.name}
                />
            </div>
            <div className="flex column">
                <CardContent>
                    <Typography variant="h5" component="p">
                        {props.playlist.name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                    onClick={() => props.handleAddSongsToPlaylist(props.playlist.href)}
                    color="secondary"
                    variant="contained"
                    className="btn">
                        Select Playlist
                    </Button>
                </CardActions>
            </div>
        </Card>
    )
}
