import React, { Component } from 'react'
import Nav from '../components/Nav'
import Appbar from '../components/Appbar'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles((theme) => {
    return {
        page: {
            width: '100%',
            padding: theme.spacing(3),
            position: 'relative',
            top: theme.mixins.toolbar.minHeight //push page content down same width as toolbar
        }
    }
})

export class Layout extends Component {
    render() {
        return (
            <div className="flex">
                {this.props.loggedIn ? 
                <Nav />
                :
                null}

                {this.props.loggedIn ? 
                <Appbar spotifyToken={this.props.spotifyToken}/>
                :
                null}
                

                <div className={useStyles.page}>
                    {/* output children  wrapped in layout on the App.js */}
                    {this.props.children}
                 </div>
                
            </div>
        )
    }
}

export default Layout
