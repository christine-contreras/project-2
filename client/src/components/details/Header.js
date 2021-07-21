import React, { Component } from 'react'
import '../../css/MovieHeader.css'
import { Card, CardContent, Typography, CardMedia, CardActions, IconButton, Button, Tooltip} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

export class Header extends Component {

    handleHeartClick = () => {
        if(this.props.movieIsSaved) {
            this.props.handleRemoveMovie(this.props.movie)
        } else {
            this.props.handleAddMovie(this.props.movie)
        }
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
                            
                            {/* need an onclick to play first track */}
                            <Button
                            onClick={this.props.handlePlaySoundtrack}
                            color="secondary"
                            variant="contained"
                            className="btn" size="large">
                                Listen Now
                            </Button>
                        </CardActions>
                    </div>
                </Card>
            </div>
        )
    }
}

export default Header
