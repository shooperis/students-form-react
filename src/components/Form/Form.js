import React, { useState, useEffect } from 'react';
import Field from './Field';
import { v4 as uuid } from 'uuid';
import './Form.css';

const Form = ({title, text, image, imageAlt, fields, onStudentCreated, studentToEditData, onStudentEdited}) => {
  const fieldsDefaultValues = {};
  fields.forEach(field => {
    fieldsDefaultValues[field.id] = {
      title: field.title,
      value: field.defaultValue ? field.defaultValue : ''
    };

    if (field.personal) {
      fieldsDefaultValues[field.id].personal = true;
    }
  });

  const [fieldsValidationMessages, setFieldsValidationMessages] = useState({});
  const [fieldsValues, setFieldsValues] = useState(fieldsDefaultValues);

  const onSetFieldValueHandler = (event, fieldType) => {
    let value = event.target.value;

    setFieldsValues(prevState => {
      if (fieldType === 'checkbox') {
        let storedItems = [...prevState[event.target.name].value];

        if (storedItems.includes(value)) {
            prevState[event.target.name].value = storedItems.filter(item => item !== value);
        } else {
          prevState[event.target.name].value = [...storedItems, value];
        }
      } else {
        prevState[event.target.name].value = value;
      }

      return {...prevState};
    });
  };

  const onFormValidation = fieldsToValidate => {
    let validationStatus = true;
    const messages = {};

    fields.forEach(field => {
      const fieldValidationOptions = field.validation;

      if (fieldValidationOptions) {
        const fieldId = field.id;
        const fieldValue = fieldsToValidate[fieldId].value;

        Object.keys(fieldValidationOptions).forEach(key => {
          let validationOptionId = key;
          let validationOptionValue = fieldValidationOptions[key];

          if (validationOptionId === 'email' && validationOptionValue === true && (!fieldValue.includes('@') || !fieldValue.includes('.'))) {
            validationStatus = false;
            messages[fieldId] = 'This field should @ and . characters';
          }

          if (validationOptionId === 'maxNumb' && Number(fieldValue) > validationOptionValue) {
            validationStatus = false;
            messages[fieldId] = `This field can't be more than ${validationOptionValue}`;
          }

          if (validationOptionId === 'minNumb' && Number(fieldValue) < validationOptionValue) {
            validationStatus = false;
            messages[fieldId] = `This field can't be less than ${validationOptionValue}`;
          }

          if (validationOptionId === 'maxLength' && fieldValue.length > validationOptionValue) {
            validationStatus = false;
            messages[fieldId] = `This field should be not more than ${validationOptionValue} characters`;
          }

          if (validationOptionId === 'minLength' && fieldValue.length < validationOptionValue) {
            validationStatus = false;
            messages[fieldId] = `This field should be at least ${validationOptionValue} characters`;
          }

          if (validationOptionId === 'required' && validationOptionValue === true && !fieldValue) {
            validationStatus = false;
            messages[fieldId] = 'This field is required';
          }
        });
      }
    });

    setFieldsValidationMessages(messages);
    return validationStatus;
  }

  const onSubmitFormHandler = event => {
    event.preventDefault();

    if (onFormValidation(fieldsValues)) {
      if (studentToEditData.id) {
        const editedStudent = studentToEditData;
        editedStudent.data = fieldsValues;

        onStudentEdited(editedStudent);
      } else {
        const newStudent = {
          id: uuid(),
          createdAt: new Date().toISOString(),
          data: fieldsValues
        }

        onStudentCreated(newStudent);
      }

      event.target.reset();
    }
  }

  const onResetFormHandler = () => {
    setFieldsValues(fieldsDefaultValues);
    
    if (studentToEditData.id) {
      onStudentEdited();
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
              {fields.map(field => {
                const validationMessage = fieldsValidationMessages[field.id];
                return <Field
                  key={field.id}
                  field={field}
                  fieldValue={fieldsValues[field.id].value}
                  validationMsg={validationMessage ? validationMessage : ''}
                  onSetFieldValue={onSetFieldValueHandler}
                />}
              )}
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