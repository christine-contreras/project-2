import React, { Component } from 'react'
import '../../css/Playlist.css'
import { DataGrid } from '@material-ui/data-grid'


export class Playlist extends Component {
    handleRowSelection = (items) => {
        console.log(items)
        // this.setState({
        //     selectedTracks: items.selectionModel
        // })
    }


    render() {

        const columns = [
            { field: 'name', headerName: 'Title', width: 500, editable: false },
            { field: 'artist', headerName: 'Artist', width: 200, editable: false },
            { field: 'time', headerName: 'Time', width: 150, editable: false },
          ] 

        return (
            <div style={{ height: '50vh', width: 1000, margin: 'auto' }}>

            {this.props.soundtracks.length !== 0
            ?
            <DataGrid
            className="playlist"
            rows={this.props.soundtracks} columns={columns} pageSize={15} 
            // onSelectionModelChange={(items) => this.handleRowSelection(items)}
            // onRowDoubleClick={(item) => this.props.handlePlaySong(item.id)}
            autoHeight
            hideFooter
            />
            :
            null

            }
            
            </div>
        )
    }
}

export default Playlist

