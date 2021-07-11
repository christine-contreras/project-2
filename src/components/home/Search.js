import React, { Component } from 'react'
import '../../css/Search.css'
import { Typography, TextField, Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

export class Search extends Component {
    state = {
        search: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        this.props.handleSearch(this.state.search)
    }

    render() {
        return (
            <div className="hero">
                <Typography variant="h1" color="secondary">
                    Search Any Movie Soundtrack
                </Typography>

                <form onSubmit={this.handleSubmit}>
                    <TextField
                    name="search"
                    label="Search"
                    placeholder="ex: lion king"
                    variant="standard"
                    color="secondary"
                    value={this.state.search}
                    onChange={this.handleChange}
                    ></TextField>

                    <Button
                    className="btn"
                    type="submit"
                    variant="contained"
                    color="secondary"
                    endIcon={<SearchIcon />}
                    >
                        Search
                    </Button>

                </form>


            </div>
        )
    }
}

export default Search
