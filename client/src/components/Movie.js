import React from 'react'
import '../css/Movie.css'
import { useHistory } from 'react-router'
import { Card, CardMedia, CardContent, CardActions, Button ,Typography, Grid} from '@material-ui/core'

export default function Movie({movie, handleMovieSelection}) {
    //lets you push to movie details
    const history = useHistory()

    const handleClick = () => {
        handleMovieSelection(movie)
        history.push('/movie-details')

    }
    return (
        <Grid
        item
        container

        xs={12} sm={12} md={4}>
            <Card className="movie-card">
                <CardMedia
                image={movie.info.image.url}
                />
                <CardContent align="center">
                    <Typography
                    className="subtitle" variant="subtitle1" color="textSecondary">
                        {movie.info.year}
                    </Typography>
                    <Typography variant="h5" component="h3">
                     {movie.info.title}
                    </Typography>
                </CardContent> 
                <CardActions>
                    <Button
                    className="btn"
                    variant="contained"
                    color="secondary"
                    onClick={handleClick}
                    >View Soundtracks</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}