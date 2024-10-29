import { Navigate, useNavigate } from 'react-router-dom';
import './signup.css';
import { useState } from 'react';
import axios from '../../utils/axios';

const Signup = () => {
  const Navigate = useNavigate();
  const [sign, setSign] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const onLogin = () => {
    Navigate('/user/login');
  };

  const onSignup = async () => {
    setSign('');
    setEmail('');
    setPass('');
    try {
      await axios.post('/user/signup', {
        name: sign,
        email: email,
        password: pass,
      });
      setSign('');
      setEmail('');
      setPass('');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="signup">
        <h1>Welcome to the signup page</h1>
        <div>
          Enter your name:
          <input
            value={sign}
            type="text"
            onChange={e => setSign(e.target.value)}
          ></input>
        </div>
        <div>
          Enter your email:
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
          ></input>
        </div>
        <div>
          Enter yrpassword:
          <input
            value={pass}
            onChange={e => {
              setPass(e.target.value);
            }}
            type="password"
          ></input>
        </div>
        <div className="signup-btn">
          <button onClick={onSignup}>Submit</button>
          <button onClick={onLogin}>Login</button>
        </div>
      </div>
    </>
  );
};
export default Signup;
