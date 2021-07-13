import React, { Component } from 'react'
import '../../css/MovieHeader.css'
import { Card, CardContent, Typography, CardMedia, CardActions, IconButton, Button, Tooltip} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { TimerSharp } from '@material-ui/icons'

export class Header extends Component {
    state = {
        movieSave: false
    }

    componentDidMount(){
        fetch('http://localhost:3000/movies')
        .then(res => res.json())
        .then(json => {
            let find = json.find(object => object.id === this.props.movie.id)

            this.setState({
                movieSave: find ? true : false
            })
        })
    }

    handleHeartClick = () => {
        this.setState(prevState => {
            return {
                movieSave: !prevState.movieSave
            }
        }, () => this.afterHeartClickHandle()
        )
        //add callback to remove playlist if it's found or add playlist to json if not found  
    }

    afterHeartClickHandle = () => {
        if(this.state.movieSave) {
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
                            {this.state.movieSave ? 
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
                            <Button color="secondary" variant="contained" className="btn" size="large">
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
