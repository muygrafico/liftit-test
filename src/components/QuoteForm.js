import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

let QuoteForm = props => {
  return (
    <form className='quote-form'>
      <div>
        <label htmlFor="origin">origin</label>
        <Field name="origin" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="destination">destination</label>
        <Field name="destination" component="input" type="text" />
      </div>
      <h4>{props.mapDistance}</h4>
      <h4>{props.mapDuration}</h4>
    </form>
  )
}

const mapStateToProps = state => ({
  mapDistance: state.map.distance,
  mapDuration: state.map.duration
})

QuoteForm = reduxForm({
  form: 'quote'
})(QuoteForm)

export default withRouter(
  connect(
    mapStateToProps
  )(QuoteForm)
)
