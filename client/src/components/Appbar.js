import React, { Component } from 'react'
import '../css/Appbar.css'
import { AppBar, Toolbar, Typography, Avatar } from '@material-ui/core'



export class Appbar extends Component {
    state = {
        name: '',
        imageUrl: ''
    }

    componentDidUpdate(prevProps) {
        if (this.props.spotifyToken !== prevProps.spotifyToken) {
            fetch('https://api.spotify.com/v1/me', {
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
                        imageUrl: json.images ?  json.images[0].url : ''
                    })
                })
        }
    }

    render() {
        return (
            <AppBar className="appbar" color="inherit" elevation={1}>
            <Toolbar className="toolbar">
                
                <Avatar className="avatar"
                src={this.state.imageUrl}/>
                <Typography>
                    {this.state.name}
                </Typography>
            </Toolbar>
        </AppBar>
        )
    }
}

export default Appbar

