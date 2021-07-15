import React, { Component } from 'react'

export class Playlist extends Component {
   componentDidMount() {
    // spotifyApi.setAccessToken(window.localStorage.getItem('access_token'))

    // // search tracks whose artist's name contains 'Love'
    // spotifyApi.searchTracks('artist:Love').then(
    //     function (data) {
    //     console.log('Search tracks by "Love" in the artist name', data);
    //     },
    //     function (err) {
    //     console.error(err);
    //     }
    // );




    // const token = window.localStorage.getItem('access_token')

    // this.props.soundtracks.map(soundtrack => {

    // })




    // fetch('https://api.spotify.com/v1/search?q=the%20boy%20with%20the%20arab%20strap%20artist:belle%20and%20sebastian&type=track&limit=5', {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json",
    //     'Authorization': 'Bearer ' + token
    //   }
    // })
    // .then(response => response.json())
    // .then(json => {
    //     json.items.map(item => {
    //         return {
    //             artist: item.artists[0].name,
    //             title: track.name
    //         }
    //     })
    // })


   }

    render() {
        return (
            <div>
                Playlist
            </div>
        )
    }
}

export default Playlist
