import React from 'react'
import Nav from '../components/Nav'
import Appbar from '../components/Appbar'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles((theme) => {
    return {
        page: {
            width: '100%',
            // padding: theme.spacing(3),
            position: 'relative',
            top: 75 //push page content down same width as toolbar
        }
    }
})

export default function Layout(props) {
    const styles = useStyles()
    return (
        <div className="flex">
            <Nav /> 
            <Appbar user={props.user}/>

            <div className={styles.page}>
                {/* output children  wrapped in layout on the App.js */}
                {props.children}
            </div>
                
        </div>
    )
}
