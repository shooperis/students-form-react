import React, { useState, useEffect } from 'react';
import Form from './components/Form/Form.js';
import List from './components/List/List.js';
import formImage from './assets/images/form-image.svg';

function App() {
  const studentsDataLS = JSON.parse(localStorage.getItem("studentsData"));
  const [studentsData, setStudentsData] = useState(studentsDataLS ? studentsDataLS : []);
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

  const editStudent = (editedStudent) => {
    if (editedStudent) {
      setStudentsData(prevState => {
        const updatedStudentsData = prevState.map(student => {
          if (student.id === editedStudent.id) {
            return { ...student, data: editedStudent.data };
          }
  
          return student;
        })
  
        return updatedStudentsData;
      })
    }
  
    setStudentToEditData({});
  };

  useEffect(() => {
    localStorage.setItem("studentsData", JSON.stringify(studentsData));
  }, [studentsData]);

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
            defaultValue: "",
            validation: {
              minLength: 3,
              required: true
            }
          },
          {
            type: "text",
            id: "last-name",
            title: "Last name",
            defaultValue: "",
            validation: {
              minLength: 3,
              required: true
            }
          },
          {
            type: "number",
            id: "age",
            title: "Age",
            defaultValue: "",
            params: {
              min: -10,
              max: 200
            },
            validation: {
              minNumb: 1,
              maxNumb: 120,
              required: true
            }
          },
          {
            type: "tel",
            id: "phone",
            title: "Phone",
            defaultValue: "",
            personal: true,
            validation: {
              minLength: 9,
              maxLength: 12,
              required: true
            }
          },
          {
            type: "email",
            id: "email",
            title: "Email",
            defaultValue: "",
            personal: true,
            validation: {
              minLength: 8,
              email: true,
              required: true
            }
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
        onStudentEdited={editStudent}
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