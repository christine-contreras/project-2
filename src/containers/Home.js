import React, { Component } from 'react'
import Search from './Search'


export class Home extends Component {
    render() {
        return (
            <div className="flex">
                <Search />
            </div>
        )
    }
}

export default Home
