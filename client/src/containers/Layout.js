import React from 'react'
import Nav from '../components/Nav'
import Appbar from '../components/Appbar'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles((theme) => {
    return {
        page: {
            width: '100%',
            position: 'relative',
            top: 70
        }
    }
})

export default function Layout({user, children}) {
    const styles = useStyles()
    return (
        <div className="flex">
            <Nav /> 
            <Appbar user={user}/>

            <div className={styles.page}>
                {/* output children  wrapped in layout on the App.js */}
                {children}
            </div>
                
        </div>
    )
}
