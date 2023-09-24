import '../style/index.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import menu from '../assets/menu.svg';

export default function Navbar() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', () => setMobile(false));

    return () => {
      removeEventListener('resize', () => setMobile(false));
    };
  }, [mobile]);

  return (
    <header className="absolute inset-x-0 z-50 border-b border-solid border-b-gray-100">
      <div className="container flex h-14 backdrop-blur-[1px] items-center justify-between">
        <h1 className="text-3xl font-bold text-yellow-400">todoer</h1>
        <button onClick={() => setMobile(!mobile)} className="mobile w-10">
          <img src={menu} alt="" />
        </button>
        <nav
          className={
            mobile
              ? 'mobile-nav bg-slate-900 py-8 gap-8 text-md font-medium'
              : 'navbar'
          }
        >
          <Link to="/">Home</Link>
          <Link to="/">About Us</Link>
          <Link to="/">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
