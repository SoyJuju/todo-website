import './App.css';
import Input from '../components/Input';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [access, giveAccess] = useState(false);
  const [error, setError] = useState(false);

  const history = useHistory();

  async function submit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/login',
        {
          email,
          password,
        }
      );

      if (response.data.accessToken) {
        const token = response.data.accessToken;
        localStorage.setItem('accessToken', token);
        giveAccess(true);
        history.push('/list');
      } else {
        giveAccess(false);
      }

      setEmail('');
      setPassword('');
    } catch (err) {
      console.log(err);
    }
  }

  function handleLogin() {
    if (access) {
      setError(false);
    } else {
      setError(true);
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={submit}>
        <h3>Email</h3>
        <Input value={email} setValue={setEmail} placeHolder={'Email'} />
        <h3>Password</h3>
        <Input
          value={password}
          setValue={setPassword}
          placeHolder={'Password'}
          type="password"
        />
        <button onClick={handleLogin}>Log In</button>
        {error ? <p>Incorrect email or password</p> : ''}
        {access ? <p>Success!</p> : ''}
      </form>
      <a href="http://localhost:5173/signup">Signup</a>
    </section>
  );
}
