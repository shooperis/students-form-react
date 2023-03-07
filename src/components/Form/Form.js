import React, { useState, useEffect } from 'react';
import './Form.css';

const Form = ({title, text, image, imageAlt, fields, onStudentCreated, studentToEditData, onUnsetStudentToEdit}) => {
  const fieldsDefaultValues = {};
  fields.forEach(field => {
    fieldsDefaultValues[`${field.id}`] = {
      title: field.title,
      value: field.defaultValue ? field.defaultValue : ''
    };

    if (field.personal) {
      fieldsDefaultValues[`${field.id}`].personal = true;
    }
  });

  // const [validateForm, setValidateForm] = useState(false);
  const [fieldsValues, setFieldsValues] = useState(fieldsDefaultValues);

  const onSetFieldValue = (event, fieldType) => {
    let value = event.target.value;

    if (fieldType === 'checkbox') {
      const checkedCheckboxes = Array.from(document.querySelectorAll(`[name="${event.target.name}"]:checked`));
      value = checkedCheckboxes.map(element => element.value);
    }

    setFieldsValues(prevState => {
      prevState[`${event.target.name}`].value = value;
      return Object.assign({}, prevState);
    });
  };

  const renderField = field => {
    const fieldValue = fieldsValues[`${field.id}`].value;

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

  const onSubmitFormHandler = event => {
    event.preventDefault();

    if (studentToEditData.id) {
      const editedStudent = studentToEditData;
      editedStudent.data = fieldsValues;

      onUnsetStudentToEdit();
    } else {
      const newStudent = {
        id: Math.random(),
        createdAt: new Date().toISOString(),
        data: fieldsValues
      }

      onStudentCreated(newStudent);
    }

    event.target.reset();
  }

  const onResetFormHandler = () => {
    setFieldsValues(fieldsDefaultValues);
    
    if (studentToEditData.id) {
      onUnsetStudentToEdit();
    }
  }

  useEffect(() => {
    if (studentToEditData.id) {
      setFieldsValues(studentToEditData.data);
    }
  }, [studentToEditData]);
  
  return (
    <section className="form-wrapper">
      <div className="left-side">
        {image && <img src={image} alt={imageAlt} />}
      </div>
      
      <div className="right-side">
        <div className="form-container">
          {title && <h1 className="form-title">{title}</h1>}
          {text && <p className="form-text">{text}</p>}
    
          <form id="students-form" onSubmit={onSubmitFormHandler} onReset={onResetFormHandler} noValidate>
            <div className="student-info">
              {fields.map(field => renderField(field))}
            </div>
            <button className="submit-button btn big-btn" type="submit">Save</button>
            <button className="reset-button btn secondary-btn big-btn" type="reset">Reset</button>
          </form>
        </div>
      </div>
    </section>
  )
};

export default Form;