import React, { Component } from 'react'
import Movie from '../../components/Movie'
import { Typography, Container, Grid } from '@material-ui/core'



class Results extends Component {
    state = {
        defaultMovies: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/movieSuggestions')
        .then(res => res.json())
        .then(defaultMovies => {
            this.setState({defaultMovies})
        })
    }
    render() {
        return (
            <Container className="padding-top">
                <Typography variant="h3" component="h3" gutterBottom>
                    
                    {
                        this.props.movies.length !== 0
                        ?
                        'Movie Results'
                        :
                        'Movie Suggestions'

                    }
                </Typography>
                <Grid container
                spacing={3}
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                >
                    {
                        this.props.movies.length !== 0
                        ?
                        this.props.movies.map(movie => (
                            <Movie key={movie.id} movie={movie}/>
                        ))
                        :
                        this.state.defaultMovies.map(movie => (
                            <Movie key={movie.id} movie={movie}/>
                        ))

                    }
                </Grid>
                
                


        </Container>
        )
    }
}

export default Results
