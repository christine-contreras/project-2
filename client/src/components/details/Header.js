import React, { Component } from 'react'
import '../../css/MovieHeader.css'
import { Card, CardContent, Typography, CardMedia, CardActions, IconButton, Button, Tooltip, Menu, MenuItem} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import AddIcon from '@material-ui/icons/Add'

export class Header extends Component {
    state = {
        anchorEl: null
    }

    handleHeartClick = () => {
        if(this.props.movieIsSaved) {
            this.props.handleRemoveMovie(this.props.movie)
        } else {
            this.props.handleAddMovie(this.props.movie)
        }
    }

    handleMenuClick = (event) => {
        this.setState({
            anchorEl: event.currentTarget
        })
    }

    handleClose = () => {
        this.setState({anchorEl: null})
    }

    render() {

        return (
            <div className="movie-hero">
                <Card className="flex">
                    <div className="movie-media">
                        {this.props.album.length !== 0 ?
                        <CardMedia
                        image={this.props.album[0].image.url}
                        title={this.props.album[0].albumTitle}
                        />
                        :
                        null
                        }
                        
                    </div>
                    <div className="flex column">
                        <CardContent>
                            <Typography variant="h2">
                                {this.props.movie.title}
                            </Typography>
                            <Typography variant="subtitle1">
                                {this.props.movie.year}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {this.props.movieIsSaved ? 
                            <Tooltip title="Remove Movie" arrow>
                                <IconButton color="secondary"
                                onClick={this.handleHeartClick}
                                >
                                    <FavoriteIcon />
                                </IconButton>
                            </Tooltip>
                            :
                            <Tooltip title="Save Movie" arrow>
                            <IconButton color="secondary"
                            onClick={this.handleHeartClick}
                            >
                                <FavoriteBorderIcon />
                            </IconButton>
                            </Tooltip>
                            }
                            
                            <Button
                            onClick={this.props.handlePlaySoundtrack}
                            color="secondary"
                            variant="contained"
                            className="btn" size="large">
                                Listen Now
                            </Button>

                            <Button
                            aria-controls="playlist-menu"
                            aria-haspopup="true"
                            className="btn playlist-btn" size="large"
                            endIcon={<AddIcon />}
                            onClick={this.handleMenuClick}>
                            Create Playlist
                            </Button>
                                <Menu
                                className="menu"
                                id="playlist-menu"
                                anchorEl={this.state.anchorEl}
                                keepMounted
                                open={Boolean(this.state.anchorEl)}
                                onClose={this.handleClose}
                                >
                                    <MenuItem>Create New Playlist</MenuItem>
                                    <MenuItem onClick={this.props.handleGetPlaylistsFromSpotify}>Add To Existing Playlist</MenuItem>
                                </Menu>
                        </CardActions>
                    </div>
                </Card>
            </div>
        )
    }
}

export default Header
