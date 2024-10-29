import Header from '../Header/header.jsx';
import './project.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';

const Project = () => {
  const [project, setProject] = useState('');
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getProject = () => {
    axios
      .get('/project/get/' + localStorage.getItem('ID'))
      .then(result => {
        console.log(result);
        setData([...result.data]);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => getProject(), []);

  const onProject = async () => {
    console.log('working');
    if (project) {
      try {
        await axios.post('/project/add', {
          title: project,
          userid: localStorage.getItem('ID'),
        });
        setProject('');
        getProject();
      } catch (e) {
        console.log(e);
      }
    }
  };
  const onProjectTodo = id => {
    navigate('/todo/' + id);
  };
  return (
    <>
      <Header></Header>

      <div className="project-box">
        {data.map(item => {
          return (
            <>
              <div className="project" onClick={() => onProjectTodo(item._id)}>
                <p className="name">{item.title}</p>
                <p className="c">created : {item.createdAt}</p>
                <p className="c">updated : {item.updatedAt}</p>
              </div>
            </>
          );
        })}
        <div className="project-create">
          <p>New-Project</p>
          <input
            type="text"
            value={project}
            onChange={e => setProject(e.target.value)}
            placeholder="     Enter New Project"
          ></input>
          <button onClick={onProject}>
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </>
  );
};
export default Project;
