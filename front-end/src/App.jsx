import Project from './pages/Project/project.jsx';
import Todo from './pages/Todo/todo.jsx';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/index.jsx';
import UserLogin from './pages/UserLogin/index.jsx';
import Signup from './pages/Signup/signup.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/user/signup" element={<Signup></Signup>} />
      <Route path="/user/login" element={<UserLogin />} />

      <Route element={<PrivateRoute role="DOCTOR" />}>
        <Route path="/" element={<Project />}></Route>
        <Route path="/todo/:id" element={<Todo />}></Route>
      </Route>
      <Route path="*" element={<h1>error</h1>}></Route>
    </Routes>
  );
};
export default App;
