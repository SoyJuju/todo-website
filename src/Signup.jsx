import './App.css';
import '../components/Input';
import Input from '../components/Input';
import axios from 'axios';
import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', {
        username,
        email,
        password,
      });

      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section>
      <h1>Signup</h1>
      <form onSubmit={submit}>
        <h3>Username</h3>
        <Input
          value={username}
          setValue={setUsername}
          placeHolder={'Username'}
        />
        <h3>Email</h3>
        <Input value={email} setValue={setEmail} placeHolder={'Email'} />
        <h3>Password</h3>
        <Input
          value={password}
          setValue={setPassword}
          placeHolder={'Password'}
        />
        <a href="http://localhost:5173/login">
          <button>Sign Up</button>
        </a>
      </form>
    </section>
  );
}
