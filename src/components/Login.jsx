import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setAuth, setAdmin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem('users'));
    let user = users.filter((item) => item.username === username);
    if (user.length === 0) {
      setMsg('user not found');
    } else {
      if (user[0].password === password) {
        localStorage.setItem(
          'auth',
          JSON.stringify({
            id: user[0].id,
            username: user[0].username,
            admin: user[0].admin,
            orders: user[0].orders,
          })
        );
        setAdmin(user[0].admin);
        navigate('/');
        setAuth(true);
      } else {
        setMsg('password is incorrect');
      }
    }
  };
  return (
    <section className="bg-gray-100">
      <div className="container mx-auto min-h-[80vh] flex justify-center items-center">
        <form
          onSubmit={handleLogin}
          className="flex flex-col text-center relative gap-7 max-w-[300px] mx-auto px-8 py-5 shadow-md rounded-md bg-white"
        >
          <p className="text-red-500">{msg}</p>
          <h1 className="font-medium text-2xl text-center text-slate-900">
            Login
          </h1>
          <input
            type="name"
            className="border-b px-2 py-1.5 text-lg border-gray-300"
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="password"
            className="border-b px-2 py-1.5 text-lg border-gray-300"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-[80px] py-1 rounded-md text-base font-medium mx-auto text-white bg-green-400"
          >
            Login
          </button>
          <p className="text-gray-600">
            I have no Account{' '}
            <Link to="/register" className="text-blue-400 font-medium">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
