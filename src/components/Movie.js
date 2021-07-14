import React from 'react'
import '../css/Movie.css'
import { useHistory } from 'react-router'
import { Card, CardMedia, CardContent, CardActions, Button ,Typography, Grid} from '@material-ui/core'

export default function Movie({movie, handleMovieSelection}) {
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
                image={movie.image.url}
                />
                <CardContent align="center">
                    <Typography
                    className="subtitle" variant="subtitle1" color="textSecondary">
                        {movie.year}
                    </Typography>
                    <Typography variant="h5" component="h3">
                     {movie.title}
                    </Typography>
                </CardContent> 
                <CardActions>
                    <Button
                    className="btn"
                    variant="contained"
                    onClick={handleClick}
                    >View Soundtracks</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}