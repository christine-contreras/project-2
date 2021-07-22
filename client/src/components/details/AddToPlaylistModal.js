import React, { Component } from 'react'
import '../../css/Modal.css'
import { Modal, Fade, Backdrop, Typography } from '@material-ui/core'
import PlaylistItem from './PlaylistItem'

export class AddToPlaylistModal extends Component {
    render() {
        return (
            <Modal
            
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={true}
            onClose={this.props.handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
        >
            <Fade in={true}>
            <div className="modal">
                <Typography variant="h3"
                align="center"
                component="p"
                >Choose A Playlist</Typography>
                <ul className="playlists">
                    {this.props.playlists.map(playlist => (
                        <PlaylistItem
                        key={playlist.id}
                        playlist={playlist}
                        handleAddSongsToPlaylist={this.props.handleAddSongsToPlaylist}
                        />
                    ))}
                </ul>
            </div>
            </Fade>
        </Modal>
        )
    }
}

export default AddToPlaylistModal
