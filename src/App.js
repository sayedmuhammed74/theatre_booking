// react router
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';

// Components
import Movies from './components/Movies';
import Register from './components/Register';
import Login from './components/Login';

// icons
import { BsFacebook, BsWhatsapp } from 'react-icons/bs';
import { FaListUl } from 'react-icons/fa';
import {
  AiFillInstagram,
  AiFillGithub,
  AiOutlineShoppingCart,
} from 'react-icons/ai';

// movies data
import { movies, users, foods } from './data.js';
import Order from './components/Order';
import Error from './components/Error';
import { useEffect, useState, useRef } from 'react';
import Cart from './components/Cart';
import ManageOrders from './components/ManageOrders';
import ManageFood from './components/ManageFood';
import ManageMovies from './components/ManageMovies';
import AddMovie from './components/AddMovie';
import AddFood from './components/AddFood';

function App() {
  const scrollTop = () => {
    window.scrollTo(0, 0);
  };
  const dropList = useRef(null);
  const handleDropList = () => {
    if (dropList.current.classList.contains('hidden')) {
      dropList.current.classList.add('flex');
      dropList.current.classList.remove('hidden');
    } else {
      dropList.current.classList.add('hidden');
      dropList.current.classList.remove('flex');
    }
  };
  // const navigate = useNavigate();
  const [auth, setAuth] = useState(localStorage.getItem('auth') ? true : false);
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem('auth'))?.admin
      ? JSON.parse(localStorage.getItem('auth'))?.admin
      : false
  );
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem('auth'))?.orders.length
  );
  useEffect(() => console.log(admin), [admin]);

  // local storage
  if (!localStorage.getItem('movies')) {
    localStorage.setItem('movies', JSON.stringify(movies));
  }
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(users));
  }
  if (!localStorage.getItem('foods')) {
    localStorage.setItem('foods', JSON.stringify(foods));
  }

  return (
    <BrowserRouter>
      {/* nav */}
      <nav className="sticky top-0 bg-[#131921] text-white z-40">
        <div className="container mx-auto flex justify-between items-center px-5 py-3">
          <Link to="/">
            <h1 className="text-2xl font-medium">Theatre Booking</h1>
          </Link>
          <div className="relative flex md:hidden">
            <FaListUl
              onClick={handleDropList}
              className="flex text-xl md:hidden cursor-pointer"
            />
            <ul
              ref={dropList}
              className="hidden flex-col absolute top-7 right-0 pr-7 pl-32 py-2 gap-2 md:hidden bg-[#131921]"
            >
              <li>
                <Link className="hover:opacity-80 ease-in duration-75" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="hover:opacity-80 ease-in duration-75"
                  to="/movies"
                >
                  Movies
                </Link>
              </li>
              {admin && auth && (
                <li>
                  <Link
                    className="hover:opacity-80 ease-in duration-75"
                    to="/dashboard/orders"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              {!auth && (
                <li>
                  <Link
                    className="hover:opacity-80 ease-in duration-75"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              )}
              {auth && (
                <li>
                  <button
                    onClick={() => {
                      localStorage.removeItem('auth');
                      setAuth(false);
                      setAdmin(false);
                    }}
                    className="hover:opacity-80 ease-in duration-75"
                  >
                    Logout
                  </button>
                </li>
              )}
              {auth && !admin && (
                <li>
                  <Link
                    className="hover:opacity-80 ease-in duration-75 relative"
                    to="/cart"
                  >
                    <span className="absolute top-[-10px] right-[12px] text-red-500">
                      {cart}
                    </span>
                    <AiOutlineShoppingCart className="text-2xl" />
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <ul className="hidden md:flex gap-4 items-center font-medium text-lg">
            <li>
              <Link className="hover:opacity-80 ease-in duration-75" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link
                className="hover:opacity-80 ease-in duration-75"
                to="/movies"
              >
                Movies
              </Link>
            </li>
            {admin && auth && (
              <li>
                <Link
                  className="hover:opacity-80 ease-in duration-75"
                  to="/dashboard/orders"
                >
                  Dashboard
                </Link>
              </li>
            )}
            {!auth && (
              <li>
                <Link
                  className="hover:opacity-80 ease-in duration-75"
                  to="/login"
                >
                  Login
                </Link>
              </li>
            )}
            {auth && (
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem('auth');
                    setAuth(false);
                    setAdmin(false);
                  }}
                  className="hover:opacity-80 ease-in duration-75"
                >
                  Logout
                </button>
              </li>
            )}
            {auth && !admin && (
              <li>
                <Link
                  className="hover:opacity-80 ease-in duration-75 relative"
                  to="/cart"
                >
                  <span className="absolute top-[-10px] right-[-8px] text-red-500">
                    {cart}
                  </span>
                  <AiOutlineShoppingCart className="text-2xl" />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/addmovie" element={<AddMovie />} />
        <Route path="/addfood" element={<AddFood />} />
        <Route
          path="/login"
          element={<Login setAuth={setAuth} setAdmin={setAdmin} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/order/:slug" element={<Order setCart={setCart} />} />
        <Route path="/dashboard/orders" element={<ManageOrders />} />
        <Route path="/dashboard/foods" element={<ManageFood />} />
        <Route path="/dashboard/movies" element={<ManageMovies />} />
        <Route path="/cart" element={<Cart setCart={setCart} />} />
        <Route path="*" element={<Error />} />
      </Routes>

      {/* footer */}
      <footer className=" bg-[#131921] text-white">
        <div className="container mx-auto flex flex-wrap justify-center md:justify-between items-center px-4 py-8 gap-5">
          {/* first */}
          <div className="flex flex-col gap-5 text-center w-full md:w-1/4 ">
            <h1 className="text-4xl font-bold">Theatre Booking</h1>
            <p className="">Online Booking Movies Tickets</p>
          </div>
          {/* second */}
          <div className="w-full md:w-1/2 lg:w-1/4">
            <ul className="flex flex-col font-medium text-lg text-center gap-3">
              <li>
                <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/movies" onClick={scrollTop}>
                  Movies
                </Link>
              </li>
            </ul>
          </div>
          {/* third */}
          <div className="w-full md:w-1/2 lg:w-1/4">
            <h1 className="text-xl font-medium my-3 text-center">
              Contact Info
            </h1>
            <ul className="flex flex-col gap-3 text-center">
              <li>sayedmohamed123.sm74@gmail.com</li>
              <li>0110-212-8186</li>
              <li className="flex justify-evenly text-2xl">
                <BsFacebook />
                <AiFillGithub />
                <AiFillInstagram />
                <BsWhatsapp />
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
