import '../style/index.css';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="pages">
      <div className="container absolute flex justify-center items-center flex-wrap-reverse inset-0 z-10">
        <div className="text-center">
          <h1 className="text-6xl font-bold leading-tight">
            Organize it all <br /> with Todoer
          </h1>
          <Link to="/login">
            <button className="mt-5 px-5 py-2 rounded-md bg-yellow-400 text-slate-950">
              Get Started
            </button>
          </Link>
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
