import React, { Component } from 'react'
import { Container, Typography, Grid } from '@material-ui/core'
import Movie from '../components/Movie'

export class Movies extends Component {
    state = {
        savedMovies: []
    }

    componentDidMount() {
        //fetch saved movies from server
        fetch('http://localhost:3000/movies')
        .then(res => res.json())
        .then(json => {
            this.setState({
                savedMovies: json
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
                    this.state.savedMovies.map(movie => (
                    <Movie key={movie.id} handleMovieSelection={this.props.handleMovieSelection} movie={movie}/>
                    ))

                    }
                </Grid>
                
                


        </Container>
        )
    }
}

export default Movies
