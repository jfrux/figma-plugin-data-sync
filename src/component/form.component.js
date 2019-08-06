import React, { Component } from "react";
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'

const FormComponent = (props) => (
  <Form
    onSubmit={props.onSubmit}
    mutators={{
      // potentially other mutators could be merged here
      ...arrayMutators
    }}
    render={({ 
      handleSubmit,
      form: {
        mutators: { push, pop }
      }, // injected from final-form-arrays above
      pristine,
      form,
      submitting,
      values }) => (
      <form onSubmit={handleSubmit}>
        <FieldArray name="customers">
          {({ fields }) => (
            <div>
              {fields.map((name, index) => (
                <div key={name}>
                  <div>
                    <label>Header Key</label>
                    <Field name={`${name}.headerKey`} component="input" />
                  </div>
                  <div>
                    <label>Header Value</label>
                    <Field name={`${name}.headerValue`} component="input" />
                  </div>
                  <button type="button" onClick={() => fields.remove(index)}>
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => fields.push({ headerKey: '', headerValue: '' })}>Add Header</button>
            </div>
          )}
        </FieldArray>
      </form>
    )}
  />
)

export default FormComponent;