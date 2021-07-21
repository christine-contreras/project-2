import React, { Component } from 'react'
import '../css/Appbar.css'
import { AppBar, Toolbar, Typography, Avatar, Button, Menu, MenuItem } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const handleLogout = () => {
    window.location.reload()
}


export class Appbar extends Component {
    state = {
        anchorEl: null
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
                
                {this.props.user.length !== 0 ?
                <Avatar className="avatar"
                src={this.props.user.imageUrl}/>
                :
                null
                }

                <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                endIcon={<ExpandMoreIcon />}
                onClick={this.handleMenuClick}>
                {this.props.user.name}
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

