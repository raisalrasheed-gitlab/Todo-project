import './header.css';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="todo-header">
        <h2>Todo App</h2>

        <button
          className="header-btn"
          onClick={() => {
            localStorage.removeItem('ID');
            localStorage.removeItem('token');
            navigate('/user/login');
          }}
        >
          logout
        </button>
      </div>
    </>
  );
};

export default Header;
