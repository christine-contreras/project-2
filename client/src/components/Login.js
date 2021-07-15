import React from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { loginUrl } from '../spotify';

const useStyles = makeStyles((theme) => ({
    hero: {
        height: '100vh',
        // backgroundColor: theme.palette.secondary.main
    },
}));

export default function Login(props) {
    const styles = useStyles()
    return (
        <Grid container direction="column" justifyContent="center" alignItems="center" className={styles.hero} color="primary">
            <Grid item container direction="column" justifyContent="center" alignItems="center" xs={6}>
                <Typography
                variant="h1"
                color="secondary"
                align="center">
                Spotify Movietracks 
                </Typography>

                <Typography
                variant="h6"
                component="p"
                color="secondary"
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
        </Grid>
    )
}
