import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
const ManageMovies = () => {
  // let { orders, username } = JSON.parse(localStorage.getItem('auth'));
  // let users = JSON.parse(localStorage.getItem('users'));
  // let isAdmin = JSON.parse(localStorage.getItem('auth')).admin;
  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem('movies'))
  );
  const deleteMovie = (e) => {
    let newMovies = movies.filter((item) => item.id != e.target.id);
    localStorage.setItem('movies', JSON.stringify(newMovies));
    setMovies(newMovies);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section>
      <div className="container mx-auto px-5 py-3 my-4 rounded-md min-h-screen bg-gray-200">
        <div className="flex justify-around items-center">
          {/* orders */}
          <h1 className="text-lg font-medium text-center bg-white rounded-md px-8 cursor-pointer py-2 text-slate-900">
            <Link to="/dashboard/orders">Orders</Link>
          </h1>
          {/* movies */}
          <h1 className="text-lg font-medium text-center bg-white rounded-md px-8 cursor-pointer py-2 text-slate-900">
            <Link to="/dashboard/movies">movies</Link>
          </h1>
          {/* foods */}
          <h1 className="text-lg font-medium text-center bg-white rounded-md px-8 cursor-pointer py-2 text-slate-900">
            <Link to="/dashboard/foods">foods</Link>
          </h1>
        </div>
        {/* manage movies */}
        <h1>
          <Link
            to="/addmovie"
            className="bg-blue-400 rounded-md font-medium text-white px-5 py-1.5 mx-auto"
          >
            Add Movie
          </Link>
        </h1>
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex flex-col gap-3 bg-white px-5 py-3 my-2 rounded-md"
          >
            <h1 className="text-lg font-medium">{movie.title}</h1>
            <button
              className="w-[120px] py-1.5 rounded-md text-base font-medium mr-3 text-white bg-red-400"
              onClick={deleteMovie}
              id={movie.id}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ManageMovies;
