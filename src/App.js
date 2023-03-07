import React, { useState } from 'react';
import Form from './components/Form/Form.js';
import List from './components/List/List.js';
import formImage from './assets/images/form-image.svg';

function App() {
  const [studentsData, setStudentsData] = useState([]);
  const [studentToEditData, setStudentToEditData] = useState({});

  const addNewStudent = newStudent => {
    setStudentsData(prevState => [newStudent, ...prevState]);
  };

  const deleteStudent = studentIdToDelete => {
    setStudentsData(prevState => prevState.filter(student => student.id !== studentIdToDelete));
  };

  const setEditStudent = student => {
    setStudentToEditData(student);
  };

  const unsetEditedStudent = () => {
    setStudentToEditData({});
  };

  return (
    <div className="wrapper">
      <Form 
        title="Students form" 
        text="Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing."
        image={formImage}
        imageAlt="form image"
        fields={[
          {
            type: "text",
            id: "first-name",
            title: "First name",
            defaultValue: ""
          },
          {
            type: "text",
            id: "last-name",
            title: "Last name",
            defaultValue: ""
          },
          {
            type: "number",
            id: "age",
            title: "Age",
            defaultValue: "",
            params: {
              min: -10,
              max: 200
            }
          },
          {
            type: "tel",
            id: "phone",
            title: "Phone",
            defaultValue: "",
            personal: true
          },
          {
            type: "email",
            id: "email",
            title: "Email",
            defaultValue: "",
            personal: true
          },
          {
            type: "range",
            id: "it-skills",
            title: "IT skills",
            defaultValue: 3,
            params: {
              min: 1,
              max: 10,
              step: 1
            }
          },
          {
            type: "radio",
            id: "group-number",
            title: "Group number",
            values: ["FEU 1gr.", "FEU 2gr.", "FEU 3gr.", "FEU 4gr."]
          },
          {
            type: "checkbox",
            id: "programming-language",
            title: "Programming language",
            values: ["PHP", "Java", "C#", ".NET"]
          }
        ]}
        onStudentCreated={addNewStudent}
        studentToEditData={studentToEditData}
        onUnsetStudentToEdit={unsetEditedStudent}
      />
      <List 
        students={studentsData}
        onDeleteStudent={deleteStudent}
        onEditStudent={setEditStudent}
      />
    </div>
  );
}

export default App;