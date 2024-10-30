import './todo.css';
import { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import Header from '../Header/header.jsx';
import { useParams } from 'react-router-dom';

const Todo = () => {
  const { id } = useParams();
  const [save, setSave] = useState('');
  const [data, setData] = useState([]);
  const [view, setView] = useState(false);
  const [editid, SetEditId] = useState();
  const [edit, setEdit] = useState();

  const getTodo = async () => {
    axios
      .get('/todo/' + id)
      .then(result => {
        setData([...result.data]);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    getTodo();
  }, []);

  const onAdd = async () => {
    try {
      await axios.post('/todo/add', {
        task: save,
        projectid: id,
      });
      getTodo();
      setSave('');
    } catch (error) {
      console.log('error');
    }
  };
  const onCheck = async (value, id) => {
    try {
      await axios.patch('/todo/check', {
        status: value ? 'complete' : 'pending',
        id: id,
      });
      getTodo();
    } catch {
      console.log('error');
    }
  };
  const onDelete = async id => {
    console.log(id);
    try {
      await axios.delete('/todo/' + id);
      getTodo();
    } catch {
      console.log('eroor in delete');
    }
  };
  const onEdit = async () => {
    try {
      await axios.patch('/todo/' + editid, { value: edit });
      getTodo();
      setEdit('');
      setView(false);
    } catch (error) {
      console.log('error in update');
    }
  };
  const onBtnEdit = e => {
    console.log(e);
    setView(true);
    SetEditId(e);
  };

  return (
    <>
      <Header></Header>
      <div className="task-section">
        <div
          className="edit-window"
          style={{ display: view ? 'block' : 'none' }}
        >
          <h1>Edit</h1>
          <input
            value={edit}
            onChange={e => {
              setEdit(e.target.value);
            }}
          ></input>
          <button onClick={onEdit}>submit</button>
        </div>
        <input
          type="text"
          placeholder="Enter your task"
          onChange={e => {
            setSave(e.target.value);
          }}
          value={save}
        ></input>
        <button onClick={() => onAdd()}>Submit</button>
      </div>
      <div className="project-name">
        <h3>Project</h3>
        <i class="fa-regular fa-pen-to-square"></i>
      </div>
      <div className="task-base">
        {data.map(item => {
          return (
            <>
              <div className="todo-task">
                <p>
                  <input
                    className="box"
                    type="checkbox"
                    onChange={e => {
                      onCheck(e.target.checked, item._id);
                    }}
                  />
                </p>
                <p className="task">{item.description}</p>

                <div className="date">
                  <div> status : {item.status}</div>
                  <div>created date : {item.createdAt}</div>
                  <div>updated date : {item.updatedAt}</div>
                </div>
                <div className="edit">
                  <i
                    class="fa-solid fa-pen-to-square"
                    onClick={() => {
                      onBtnEdit(item._id);
                    }}
                  ></i>
                  <i
                    onClick={() => {
                      onDelete(item._id);
                    }}
                    class="fa-solid fa-trash"
                  ></i>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
export default Todo;
