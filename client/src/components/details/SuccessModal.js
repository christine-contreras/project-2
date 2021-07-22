import React from 'react'
import '../../css/Modal.css'
import { Modal, Fade, Backdrop, Typography } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

export default function SuccessModal({message, handleCloseModal}) {
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
                >
                    <CheckCircleIcon color="primary" /> {message}
                </Typography>
            </div>
            </Fade>
        </Modal>
    )
}
