import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
  const [title, setTitle] = useState('');
  const [rate, setRate] = useState('');
  const [img, setImg] = useState('');
  const navigate = useNavigate();
  const handleAddMovie = () => {
    let movie = {
      id: Math.round(Math.random() * 10000),
      title,
      slug: title.toLowerCase().replace(' ', '-'),
      desc: `${title} movie`,
      price: 50,
      rate,
      stars: '4',
      image: `./movies/${title.toLowerCase().replace(' ', '-')}.jpg`,
      times: [
        {
          time: '8pm',
          booked: {
            positions: [],
          },
        },
        {
          time: '10pm',

          booked: {
            positions: [],
          },
        },
        {
          time: '12am',
          booked: {
            positions: [],
          },
        },
      ],
    };
    let movies = JSON.parse(localStorage.getItem('movies'));
    movies.push(movie);
    localStorage.setItem('movies', JSON.stringify(movies));
    navigate('/movies');
  };
  useEffect(() => console.log(img), [img]);
  return (
    <section className="bg-gray-300 px-5 py-5">
      <div className="container mx-auto flex justify-center items-center min-h-screen">
        <div className="flex flex-col gap-4 px-5 mx-auto max-w-[400px] my-3 py-5 bg-white rounded-md shadow-md">
          <input
            type="text"
            placeholder="movie name"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="border-b border-gray-400 rounded px-3 py-1.5"
          />
          <input
            type="text"
            placeholder="rate"
            onChange={(e) => setRate(e.target.value)}
            value={rate}
            className="border-b border-gray-400 rounded px-3 py-1.5"
          />
          <input
            type="file"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
          <button
            className="w-[100px] py-1.5 rounded-md text-base font-medium mx-auto text-white bg-blue-500"
            onClick={handleAddMovie}
          >
            Add
          </button>
        </div>
      </div>
    </section>
  );
};

export default AddMovie;
