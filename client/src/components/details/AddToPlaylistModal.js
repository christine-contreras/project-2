import React from 'react'
import '../../css/Modal.css'
import { Modal, Fade, Backdrop, Typography } from '@material-ui/core'
import PlaylistItem from './PlaylistItem'



export default function AddToPlaylistModal({handleCloseModal, handleAddSongsToPlaylist, playlists}) {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={true}
            onClose={handleCloseModal}
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
                    {playlists.map(playlist => (
                        <PlaylistItem
                        key={playlist.id}
                        playlist={playlist}
                        handleAddSongsToPlaylist={handleAddSongsToPlaylist}
                        />
                    ))}
                </ul>
            </div>
            </Fade>
        </Modal>
    )
}