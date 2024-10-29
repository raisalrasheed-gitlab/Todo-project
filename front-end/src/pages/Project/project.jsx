import { useState } from 'react';
import Header from '../Header/header.jsx';
import './project.css';

const Project = () => {
  const [data, setData] = useState([]);
  return (
    <>
      <Header></Header>

      <div className="project-box">
        {data.map(item => {
          return (
            <>
              <div className="project" onClick={() => onProjectTodo()}>
                <p className="name">{item.title}</p>
                <p className="c">created : {item.createdAt}</p>
                <p className="c">updated : {item.updatedAt}</p>
              </div>
            </>
          );
        })}
        <div className="project-create">
          <p>New-Project</p>
          <input type="text" placeholder="     Enter New Project"></input>
          <button>
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </>
  );
};
export default Project;
