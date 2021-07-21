import React, { Component } from 'react'
import '../css/Appbar.css'
import { AppBar, Toolbar, Typography, Avatar, Button, Menu, MenuItem } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const handleLogout = () => {
    window.location.reload()
}


export class Appbar extends Component {
    state = {
        name: '',
        imageUrl: '',
        anchorEl: null
    }

    componentDidMount() {
        this.fetchSpotifyProfile()
    }

    componentDidUpdate(prevProps) {
        if (this.props.spotifyToken !== prevProps.spotifyToken) {
            this.fetchSpotifyProfile()
        }
    }

    fetchSpotifyProfile = () => {
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


    handleMenuClick = (event) => {
        this.setState({
            anchorEl: event.currentTarget
        })
    }

    handleClose = () => {
        this.setState({anchorEl: null})
    }

    

    render() {
        return (
            <AppBar className="appbar" color="inherit" elevation={1}>
            <Toolbar className="toolbar">
                
                <Avatar className="avatar"
                src={this.state.imageUrl}/>

                <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                endIcon={<ExpandMoreIcon />}
                onClick={this.handleMenuClick}>
                {this.state.name}
                </Button>
                    <Menu
                    className="menu"
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                    >
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
            </Toolbar>
        </AppBar>
        )
    }
}

export default Appbar

