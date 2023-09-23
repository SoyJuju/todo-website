import { useState } from 'react';
import Input from '../components/Input';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import showPass from '../assets/show-pass.svg';
import hidePass from '../assets/hide-pass.svg';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const history = useHistory();

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

      history.push('/login');
    } catch (err) {
      console.log(err);
    }
  }

  const inputClass = 'px-3 py-2 rounded-sm my-3 text-slate-950';

  return (
    <section className="pages">
      <div className="container grid place-items-center absolute inset-0 z-10">
        <div className="w-80 text-center">
          <h1 className="text-4xl font-bold my-8">Signup</h1>
          <form onSubmit={submit} className="grid">
            <Input
              value={username}
              setValue={setUsername}
              placeHolder={'Username'}
              className={inputClass}
              autoComplete={'username'}
            />
            <Input
              value={email}
              setValue={setEmail}
              placeHolder={'Email'}
              className={inputClass}
              autoComplete={'email'}
            />
            <div className="relative">
              <Input
                value={password}
                setValue={setPassword}
                placeHolder={'Password'}
                className={inputClass + ' w-80'}
                type={showPassword ? 'text' : 'password'}
                autoComplete={'current-password'}
              />
              <button
                className="absolute right-3 top-5"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                <img
                  className="w-6"
                  src={showPassword ? hidePass : showPass}
                  alt=""
                />
              </button>
            </div>
            <button
              className="mt-6 py-2 rounded-md bg-yellow-400 text-slate-950"
              type="submit"
            >
              Sign Up
            </button>
            <p className="mt-3">
              Already have an account?{' '}
              <Link className="text-blue-600" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="bg-animation">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div id="stars4"></div>
      </div>
    </section>
  );
}
