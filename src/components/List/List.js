import Item from './Item';
import './List.css';

const List = ({students, onDeleteStudent, onEditStudent}) => {
  const renderList = () => {
    if (!students || students.length < 1) {
      return <div className="no-data">No students found</div>;
    }

    return students.map((student) => (
      <Item key={student.id} student={student} onDeleteStudent={onDeleteStudent} onEditStudent={onEditStudent} />
    ));
  }
  
  return (
    <section className="students-list-wrapper hidden">
      <div className="students-list-header">
        <div className="title-wrapper">
          <h2 className="list-title">Students list</h2>
        </div>
      </div>

      <div id="students-list">
        {renderList()}
      </div>
    </section>
  )
};

export default List;