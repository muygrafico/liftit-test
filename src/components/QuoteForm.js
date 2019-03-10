// import React from 'react'

// export default () => (
//   <div className='input-text'>
//     <input type="text"/>
//   </div>
// )

import React from 'react'
import { Field, reduxForm } from 'redux-form'

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
      <button type="submit">update</button>
    </form>
  )
}

QuoteForm = reduxForm({
  // a unique name for the form
  form: 'quote'
})(QuoteForm)

export default QuoteForm
