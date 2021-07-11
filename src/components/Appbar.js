import React, { Component } from 'react'
import './css/Appbar.css'
import { AppBar, Toolbar, Typography, Avatar } from '@material-ui/core'

export class Appbar extends Component {
    state = {
        name: '',
        imageUrl: ''
    }
    componentDidMount() {
        fetch("https://api.spotify.com/v1/me", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Authorization': 'Bearer ' + this.props.spotifyToken
        }
        })
        .then(response => response.json())
        .then(json => {
            this.setState({
                name: json.display_name,
                imageUrl: json.images[0].url
            })
        })

    }
    render() {
        return (
            <AppBar className="appbar">
                <Toolbar className="toolbar">
                    <Typography>
                        {this.state.name}
                    </Typography>
                    <Avatar className="avatar"
                    src={this.state.imageUrl}/>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Appbar