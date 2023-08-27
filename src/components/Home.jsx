import { Link } from 'react-router-dom';
import Movie from './Movie';
import { useEffect } from 'react';
const Home = () => {
  const movies = window.localStorage.getItem('movies');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {/* header */}
      <header className="h-[60vh] bg-gray-300 relative">
        <img
          src="./cover.jpg"
          alt=""
          className="absolute top-0 left-0 w-full h-full"
        />
        <div className="container mx-auto h-full flex justify-center items-center">
          <h1 className="text-3xl relative z-10 text-white font-medium">
            Theatre Booking
          </h1>
        </div>
      </header>

      {/* New */}
      <section className="my-12">
        <div className="container mx-auto px-6 py-5 text-center rounded-3xl shadow-2xl bg-white">
          <h1 className="mb-5 text-3xl font-medium text-heading">Movies</h1>
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {JSON.parse(movies)
              .slice(0, 5)
              .map((movie, index) => (
                <Movie movie={movie} key={index} />
              ))}
          </div>
          <Link to="/movies">
            <button className="px-6 py-2.5 rounded-3xl text-white bg-gray-700  mt-5 hover:bg-gray-500 hover:text-black ease-in duration-100">
              VIEW MORE
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
