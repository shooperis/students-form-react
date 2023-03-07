import React, { useState } from 'react';

const Item = ({student, onDeleteStudent, onEditStudent}) => {
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);

  const togglePersonalInfo = () => {
    setShowPersonalInfo(prevState => !prevState);
  };

  const renderData = key => {
    if ((student.data[key].value && student.data[key].value.length > 0) || typeof student.data[key].value === 'number') {
      let entryId = key;
      let entryName = student.data[key].title;
      let entryValue = (student.data[key].personal === true && showPersonalInfo !== true) ? '***' : student.data[key].value;
      let entryType = typeof entryValue;

      if (entryId === 'first-name') {
        return <h3 key={entryId}>{entryValue}</h3>;
      }

      if (entryId === 'last-name') {
        return <h4 key={entryId}>{entryValue}</h4>;
      }

      if (entryType === 'object' || entryType === 'array') {
        return <p key={entryId}>{entryName}: {entryValue.map((item, index) => <li key={index}>{item}</li>)}</p>;
      }

      return <p key={entryId}>{entryName}: {entryValue}</p>;
    }
  }
  
  return (
    <div key={student.id} className="student-item">
      {student.data && (
        <div className="content">
          {Object.keys(student.data).map(key => renderData(key))}
        </div>
      )}
      <div className="buttons-wrapper">
        <button className="btn small-btn third-btn" onClick={togglePersonalInfo}>{showPersonalInfo ? 'Hide personal info' : 'Show personal info'}</button>
        <button className="btn small-btn" onClick={() => onEditStudent(student)}>Edit this student</button>
        <button className="btn small-btn secondary-btn" onClick={() => onDeleteStudent(student.id)}>Delete this student</button>
      </div>
    </div>
  )
};

export default Item;