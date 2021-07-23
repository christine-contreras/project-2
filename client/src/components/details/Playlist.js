import React from 'react'
import '../../css/Playlist.css'
import { DataGrid } from '@material-ui/data-grid'



export default function Playlist({soundtracks}) {
    const columns = [
        { field: 'name', headerName: 'Title', width: 500, editable: false },
        { field: 'artist', headerName: 'Artist', width: 200, editable: false },
        { field: 'time', headerName: 'Time', width: 150, editable: false },
      ] 

    return (
        <div style={{ height: '50vh', width: 1000, margin: 'auto' }}>

            {soundtracks.length !== 0
            ?
            <DataGrid
            className="playlist"
            rows={soundtracks} columns={columns} pageSize={15} 
            autoHeight
            hideFooter
            />
            :
            null
            }
            
        </div>
    )
}

