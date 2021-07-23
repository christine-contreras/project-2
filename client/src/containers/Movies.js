import React, { Component } from 'react'
import { Container, Typography, Grid } from '@material-ui/core'
import Movie from '../components/Movie'

export class Movies extends Component {
    state = {
        movies: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/movies')
        .then(res => res.json())
        .then(json => {
            // const serverMovies = json.map(movie => {
            //     return movie.info
                
            // })

            this.setState({
                movies: json
            })
        })
    }

    render() {
        return (
            <Container className="padding" lg>
                <Typography variant="h3" component="h3" gutterBottom className="title">
                    Saved Movies
                </Typography>
                <Grid container
                spacing={3}
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                >
                    { 
                    this.state.movies.map(movie => (
                    <Movie key={movie.id} handleMovieSelection={this.props.handleMovieSelection} movie={movie}/>
                    ))

                    }
                </Grid>
                
                


        </Container>
        )
    }
}

export default Movies
