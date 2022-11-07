import React from 'react'
import { Field,FieldArray, reduxForm } from 'redux-form'
import { connect } from "react-redux";

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} style={{width:'100%',borderRadius:'4px',border:'0.5px solid grey'}} />
      {touched && error && <span>{error}</span>}         
    </div>
  </div>
);

const renderMedia = ({ fields, meta: { touched, error, submitFailed } }) => (
  <ul style={{listStyle:'none'}}>
    <li>
      <button type="button" onClick={() => fields.push({})}>Add Media</button>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </li>
    {fields.map((media, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Media"
          onClick={() => fields.remove(index)}
        />
        <h4 style={{color:'white'}}>Media #{index + 1}</h4>
        <Field
          name={`${media}.name`}
          type="text"
          component={renderField}
          label="Name"
        />
        <Field
          name={`${media}.url`}
          type="text"
          component={renderField}
          label="URL"
        />
        <Field
          name={`${media}.type`}
          type="text"
          component={renderField}
          label="Type"
        />
        <Field
          name={`${media}.category`}
          type="text"
          component={renderField}
          label="Category"
        />
      </li>
    ))}
  </ul>
);

const renderAmenties = ({ fields, meta: { touched, error, submitFailed } }) => (
    <ul style={{listStyle:'none'}}>
      <li>
        <button type="button" onClick={() => fields.push({})}>Add Amenity</button>
        {(touched || submitFailed) && error && <span>{error}</span>}
      </li>
      {fields.map((media, index) => (
        <li key={index}>
          <button
            type="button"
            title="Remove Amenity"
            onClick={() => fields.remove(index)}
          />
          <h4 style={{color:'white'}}>Amenity #{index + 1}</h4>
          <Field
            name={`${media}.name`}
            type="text"
            component={renderField}
            label="Name"
          />
          <Field
            name={`${media}.type`}
            type="text"
            component={renderField}
            label="Type"
          />
          <Field
            name={`${media}.source`}
            type="text"
            component={renderField}
            label="Source"
          />
        </li>
      ))}
    </ul>
  );
  


const renderBooths = ({ fields, meta: { touched, error, submitFailed } }) => (
  <ul style={{listStyle:'none'}}>
    <li>
      <button type="button" onClick={() => fields.push({})}>Add Booth</button>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </li>
    {fields.map((media, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Booth"
          onClick={() => fields.remove(index)}
        />
        <h4 style={{color:'white'}}>Booth #{index + 1}</h4>
        <Field
          name={`${media}.id`}
          type="text"
          component={renderField}
          label="ID"
        />
        <Field
          name={`${media}.subvenue`}
          type="text"
          component={renderField}
          label="Sub Venue"
        />
        <Field
          name={`${media}.number`}
          type="text"
          component={renderField}
          label="number"
        />
        <Field
          name={`${media}.type`}
          type="text"
          component={renderField}
          label="Type"
        />
        <Field
          name={`${media}.model`}
          type="text"
          component={renderField}
          label="Model"
        />
              <FieldArray name="amenities" component={renderAmenties}/>

      </li>
    ))}
  </ul>
);

const ExibitorConfigForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="name"
        type="text"
        component={renderField}
        label="Event Name"
      />
      <Field
        name="description"
        type="text"
        component={renderField}
        label="Description"
      />
      <Field
        name="eventId"
        type="text"
        component={renderField}
        label="Event ID"
      />
      <Field
        name="phoneNo"
        type="text"
        component={renderField}
        label="Phone Number"
      />
      <Field
        name="emailId"
        type="text"
        component={renderField}
        label="Email ID"
      />
      <Field
        name="logo"
        type="text"
        component={renderField}
        label="Logo URL"
      />
      <Field
        name="exhibitorId"
        type="text"
        component={renderField}
        label="Exhibitor Id"
      />
      <Field
        name="website"
        type="text"
        component={renderField}
        label="Website URL"
      />
      <Field
        name="logo"
        type="text"
        component={renderField}
        label="Logo"
      />
      <Field
        name="address.street"
        type="text"
        component={renderField}
        label="Address - Street"
      />
      <Field
        name="address.city"
        type="text"
        component={renderField}
        label="City"
      />
      <Field
        name="address.state"
        type="text"
        component={renderField}
        label="State"
      />
      <Field
        name="address.zipcode"
        type="text"
        component={renderField}
        label="Zipcode"
      />
      <FieldArray name="metadata.media" component={renderMedia}/>
      <FieldArray name="booths" component={renderBooths}/>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
         Reset
        </button>
      </div>
    </form>
    
  )
}

const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
  initialValues : state.dashboard.initialValues
});
const exhibitorForm = reduxForm({
  form: 'exhibitor-form' ,
  enableReinitialize:true
})(ExibitorConfigForm)

export default connect(mapStateToProps)(exhibitorForm)
