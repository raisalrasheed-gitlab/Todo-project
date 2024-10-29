import { Input, Button } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import './userlogin.css';

const UserLogin = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const onChange = (e, key) => {
    setLogin({ ...login, [key]: e.target.value });
  };

  const onLogin = async () => {
    try {
      const response = await axios.post('/user/login', login);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('ID', response.data.id);

      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  console.log(login);

  return (
    <div className="user-login-form">
      <h1>User Login</h1>
      <div className="p"> Email: </div>
      <Input classname="p" onChange={e => onChange(e, 'email')} />

      <div className="p">Password:</div>
      <Input
        className="p"
        type="password"
        onChange={e => onChange(e, 'password')}
      />
      <Button className="user-btn" onClick={onLogin}>
        Login
      </Button>
    </div>
  );
};

export default UserLogin;
