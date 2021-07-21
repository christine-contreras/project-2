import React, { Component } from 'react'
import { Modal, Fade } from '@material-ui/core'

export class CreatePlaylistModal extends Component {
    render() {
        return (
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={true}
            // onClose={handleClose}
            closeAfterTransition
            // BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={true}>
            <div>
                <h2 id="transition-modal-title">Transition modal</h2>
                <p id="transition-modal-description">react-transition-group animates me.</p>
            </div>
            </Fade>
        </Modal>
        )
    }
}

export default CreatePlaylistModal
