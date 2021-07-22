import React from 'react'
import '../css/Login.css'
import { Grid, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { loginUrl } from '../spotify';

const useStyles = makeStyles((theme) => ({
    hero: {
        height: '100vh',
        backgroundColor: theme.palette.common.white
    },
    copy: {
        zIndex: 5
    },
    text: {
        color: 'rgb(0 0 0 / 70%)'
    }
}));

export default function Login(props) {
    const styles = useStyles()
    return (
        <Grid container direction="column" justifyContent="center" alignItems="center" className={styles.hero} color="primary">
            <div className="circle left"></div>
            <Grid item container direction="column" justifyContent="center" alignItems="center" xs={6} className={styles.copy}>
                <Typography
                className={styles.text}
                variant="h1"
                align="center">
                Spotify Movietracks 
                </Typography>

                <Typography
                className={styles.text}
                variant="h6"
                component="p"
                gutterBottom>
                It's like your favorite directors making a mix tape just for you.
                </Typography>

                <Button
                type="submit"
                color="primary"
                variant="contained"
                size="large"
                className="btn"
                href={loginUrl}
                >Login To Spotify</Button>
            </Grid>
            <div className="circle right"></div>
        </Grid>
    )
}
