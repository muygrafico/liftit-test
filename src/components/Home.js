import React, { Component } from 'react'
import Directions from './Directions/DirectionsIndex'
// import './App.css'

class Home extends Component {
  render () {
    return (
      <div className='home-page'>
        <div>
          <input type="text" placeholder='origin' />
          <input type="text" placeholder='destination' />
        </div>
        <div>
          <Directions />
        </div>
      </div>
    )
  }
}

export default Home
