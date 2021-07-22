import React from 'react'
import '../../css/PlaylistItem.css'
import { Card, CardMedia, CardContent, CardActions, Button, Typography } from '@material-ui/core'

export default function PlaylistItem({playlist, handleAddSongsToPlaylist}) {
    return (
        <Card className="flex">
            <div className="playlist-media">
                <CardMedia
                image={playlist.images[0].url}
                title={playlist.name}
                />
            </div>
            <div className="flex column">
                <CardContent>
                    <Typography variant="h5" component="p">
                        {playlist.name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                    onClick={() => handleAddSongsToPlaylist(playlist)}
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
