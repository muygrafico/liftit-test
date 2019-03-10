import React, { Component } from 'react'
import Directions from './Directions/DirectionsIndex'
import QuoteForm from './QuoteForm'
// import './App.css'

class Home extends Component {
  render () {
    return (
      <div className='home-page'>
        <div>
          <QuoteForm />
        </div>
        <div>
          <Directions />
        </div>
      </div>
    )
  }
}

export default Home
