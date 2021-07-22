import React from 'react'
import '../../css/Modal.css'
import { Modal, Fade, Backdrop, Typography, Button } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

export default function SuccessModal({message, handleCloseModal, playlist}) {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={true}
            onClose={handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 200,
            }}
        >
            <Fade in={true}>
            <div className="modal">
                <Typography variant="h5"
                align="center"
                component="p"
                gutterBottom
                >
                    <CheckCircleIcon color="primary" /> {message}
                </Typography>
                <Typography variant="subtitle1"
                align="center"
                component="p"
                gutterBottom
                >
                    Playlist: {playlist.name}
                </Typography>
                <Button
                target="_blank"
                href={playlist.external_urls.spotify}
                color="secondary"
                variant="contained"
                className="btn">
                    Listen to Playlist
                </Button>
            </div>
            </Fade>
        </Modal>
    )
}
