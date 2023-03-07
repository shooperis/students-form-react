import React from 'react';

const Field = ({field, fieldValue, onSetFieldValue}) => {
  const fieldOptions = {
    name: field.id, 
    id: field.id,
    type: field.type,
    value: fieldValue,
    onChange: (event) => onSetFieldValue(event, field.type)
  }

  if (field.params) {
    Object.keys(field.params).forEach(key => {
      fieldOptions[`${key}`] = field.params[key];
    });
  }

  if (field.type === 'text' || field.type === 'number' || field.type === 'tel' || field.type === 'email') {
    return (
      <div key={field.id} className="input-group">
        <label htmlFor={field.id}>{field.title}</label>
        {React.createElement('input', fieldOptions)}
        {/* {validateForm && fieldValue.length < 3 && (
          <span className="error-text">This field is required</span>
        )} */}
      </div>
    );
  }

  if (field.type === 'range') {
    return (
      <div key={field.id} className="input-group">
        <label htmlFor={field.id}>{field.title}</label>
        <div className="input-range">
          {React.createElement('input', fieldOptions)}
          <output>{fieldValue}</output>
        </div>
      </div>
    );
  }

  if (field.type === 'radio') {
    return (
      <fieldset key={field.id}>
        <legend>{field.title}</legend>

        {field.values.map((value, index) => {
          let radioId = field.id + '-' + index;
          let isChecked = value === fieldValue;

          return (
            <div key={radioId} className="input-group">
              <input 
                name={field.id} 
                id={radioId}
                type={field.type}
                value={value}
                checked={isChecked}
                onChange={event => {onSetFieldValue(event, field.type)}}
              />
              <label htmlFor={radioId}>{value}</label>
            </div>
          )
        })}
      </fieldset>      
    );
  }

  if (field.type === 'checkbox') {
    return (
      <fieldset key={field.id}>
        <legend>{field.title}</legend>

        {field.values.map((value, index) => {
          let checkboxId = field.id + '-' + index;
          let isChecked = false;
          if (fieldValue) {
            isChecked = fieldValue.filter(item => item === value).length > 0;
          }
          
          return (
            <div key={checkboxId} className="input-group">
              <input 
                name={field.id} 
                id={checkboxId}
                type={field.type}
                value={value}
                checked={isChecked}
                onChange={event => {onSetFieldValue(event, field.type)}}
              />
              <label htmlFor={checkboxId}>{value}</label>
            </div>
          )
        })}
      </fieldset>      
    );
  }
}

export default Field