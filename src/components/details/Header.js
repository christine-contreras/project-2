import React, { Component } from 'react'
import '../../css/MovieHeader.css'
import { Card, CardContent, Typography, CardMedia, CardActions, IconButton, Button, Tooltip} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

export class Header extends Component {
    state = {
        movieSaved: false
    }

    componentDidMount(){
        fetch('http://localhost:3000/movies')
        .then(res => res.json())
        .then(json => {
            let find = json.find(object => object.id === this.props.movie.id)

            this.setState({
                movieSaved: find ? true : false
            })
        })
    }

    handleHeartClick = () => {
        this.setState(prevState => {
            return {
                movieSaved: !prevState.movieSaved
            }
        })
        //add callback to remove playlist if it's found or add playlist to json if not found

        
    }
    render() {

        return (
            <div className="movie-hero">
                <Card className="flex">
                    <div className="movie-media">
                        <CardMedia
                        image={this.props.album[0].image.url}
                        title={this.props.album[0].albumTitle}
                        />
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
                            {this.state.movieSaved ? 
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
