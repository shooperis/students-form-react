import React from 'react';
import './Field.css';

const Field = ({field, fieldValue, validationMsg, onSetFieldValue}) => {
  const fieldOptions = {
    name: field.id, 
    id: field.id,
    type: field.type,
    value: fieldValue,
    onChange: (event) => onSetFieldValue(event, field.type)
  }

  if (field.params) {
    Object.keys(field.params).forEach(key => {
      fieldOptions[key] = field.params[key];
    });
  }

  if (validationMsg) {
    fieldOptions.className = 'error';
  }

  if (field.type === 'text' || field.type === 'number' || field.type === 'tel' || field.type === 'email') {
    return (
      <div key={field.id} className="input-group">
        <label htmlFor={field.id}>{field.title}</label>
        {React.createElement('input', fieldOptions)}
        {validationMsg && (
          <span className="error-text">{validationMsg}</span>
        )}
      </div>
    );
  }

  if (field.type === 'range') {
    return (
      <div key={field.id} className="input-group">
        <label htmlFor={field.id}>{field.title}</label>
        <div className="input-range">
          {React.createElement('input', fieldOptions)}
          <output className={validationMsg ? 'error' : ''}>{fieldValue}</output>
        </div>
        {validationMsg && (
          <span className="error-text">{validationMsg}</span>
        )}
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
              <label htmlFor={radioId} className={validationMsg ? 'error' : ''}>{value}</label>
            </div>
          )
        })}

        {validationMsg && (
          <span className="error-text">{validationMsg}</span>
        )}
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
              <label htmlFor={checkboxId} className={validationMsg ? 'error' : ''}>{value}</label>
            </div>
          )
        })}

        {validationMsg && (
          <span className="error-text">{validationMsg}</span>
        )}
      </fieldset>      
    );
  }
}

export default Field