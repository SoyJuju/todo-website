import Input from '../components/Input';
import axios from 'axios';
import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import showPass from '../assets/show-pass.svg';
import hidePass from '../assets/hide-pass.svg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [access, giveAccess] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        setError(false);
        history.push('/list');
      } else {
        giveAccess(false);
        setError(true);
      }

      setEmail('');
      setPassword('');
    } catch (err) {
      console.log(err);
    }
  }

  if (localStorage.getItem('accessToken')) {
    history.push('/list');
  }

  const inputClass = 'px-3 py-2 rounded-sm my-3 text-slate-950';

  return (
    <section className="pages">
      <div className="container grid place-items-center absolute inset-0 z-10">
        <div className="w-80 text-center">
          <h1 className="text-4xl font-bold my-8">Login</h1>
          <form onSubmit={submit} className="grid">
            <Input
              value={email}
              setValue={setEmail}
              placeHolder={'Email'}
              className={inputClass}
              autoComplete={'email'}
            />
            <div className="relative z-10">
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
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  className="w-6"
                  src={showPassword ? hidePass : showPass}
                  alt=""
                />
              </button>
            </div>
            <Link className="py-1 text-blue-600">Forgot Password?</Link>
            <button
              type="submit"
              className="mt-6 py-2 rounded-md bg-yellow-400 text-slate-950"
            >
              Log In
            </button>
            {error && <p>Incorrect email or password</p>}
            {access && <p>Success!</p>}
          </form>
          <p className="mt-3">
            Don&apos;t have an account?{' '}
            <Link className="text-blue-600" to="/signup">
              Signup
            </Link>
          </p>
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
