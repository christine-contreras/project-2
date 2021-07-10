import React, { Component } from 'react'
import Nav from '../components/Nav'
import Search from './Search'


export class Home extends Component {
    render() {
        return (
            <div className="flex">
                <Nav />
                <Search />
            </div>
        )
    }
}

export default Home
