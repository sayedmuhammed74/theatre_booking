import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Error from './Error';
import Seats from './Seats';

const Order = ({ setCart }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  let movies = JSON.parse(localStorage.getItem('movies'));
  const movie = JSON.parse(localStorage.getItem('movies')).filter(
    (item) => item.slug === slug
  );
  const [seats, setSeats] = useState(movie[0].times[0]);
  const foods = JSON.parse(localStorage.getItem('foods'));

  // order details
  const [numOfTickets, setNumOfTickets] = useState(0);
  const [price, setPrice] = useState(0);
  const [phone, setPhone] = useState('');
  const [food, setFood] = useState(0);
  const [numberOfFood, setNumOfFood] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [time, setTime] = useState();

  // scroll top
  useEffect(() => window.scrollTo(0, 0), []);

  const handleTimeChange = (e) => {
    let matchedMovieWithTime = movie[0].times.filter(
      (item) => item.time === e.target.value
    );
    setSeats(matchedMovieWithTime[0]);
    setTime(e.target.value);
  };

  // handle params error
  if (!movie) {
    return <Error />;
  }
  // handle choosed Seats
  let arr = [];
  const handlePostions = (e) => {
    const position = parseInt(e.target.parentElement.getAttribute('position'));
    if (arr.includes(position)) {
      const index = arr.indexOf(position);
      if (index > -1) {
        arr.splice(index, 1);
      }
      e.target.parentElement.classList.remove('text-yellow-500');
    } else if (position === null) {
      console.log('null');
    } else {
      e.target.parentElement.classList.add('text-yellow-500');
      arr.push(position);
    }
    return arr;
  };

  // add to user cart
  const addToCart = () => {
    let userId = JSON.parse(localStorage.getItem('auth')).id;
    if (phone && numOfTickets > 0 && userId) {
      let users = JSON.parse(localStorage.getItem('users'));
      let order = {
        id: Math.round(Math.random() * 10000),
        movie: movie[0].title,
        numOfTickets,
        numberOfFood,
        time,
        price: totalPrice,
        phone,
        seats: arr,
        created_at: new Date(),
      };
      users.map((user) => {
        if (user.id === userId) {
          user.orders.push(order);
          return user;
        }
      });
      localStorage.setItem('users', JSON.stringify(users));
      let auth = JSON.parse(localStorage.getItem('auth'));
      auth.orders.push(order);
      localStorage.setItem('auth', JSON.stringify(auth));
      let newMovie = movie[0].times.map((item) => {
        if (item.time === time) {
          item.booked.positions = [...item.booked.positions, ...arr];
          return item;
        } else {
          return item;
        }
      });
      let newMovies = movies.map((item) => {
        if (item.slug === slug) {
          item.times = newMovie;
          return item;
        } else {
          return item;
        }
      });
      localStorage.setItem('movies', JSON.stringify(newMovies));
      arr = [];
      setCart(JSON.parse(localStorage.getItem('auth'))?.orders.length);
      let isAdmin = JSON.parse(localStorage.getItem('auth'))?.admin;
      if (isAdmin) {
        navigate('/dashboard/orders');
      } else {
        navigate('/cart');
      }
    } else {
    }
  };

  return (
    <section className="min-h-[100vh] bg-gray-200 py-5">
      <div className="container mx-auto p-5 flex flex-col items-center bg-white text-gray-700">
        <form className="md:max-w-[500px] px-5 py-2">
          <h1 className="text-2xl text-center font-medium text-slate-900 my-2">
            {movie[0].title}
          </h1>

          <p className="text-lg">
            Tickets Price:{' '}
            <span className="ml-2 text-gray-500">${movie[0].price}</span>
          </p>

          <div className="flex items-center justify-between gap-5">
            <p className="text-lg">number of tickets: </p>
            <input
              type="number"
              placeholder="number of tickets"
              className="px-2 text-lg rounded-md border-b border-gray-400"
              value={numOfTickets}
              onChange={(e) => {
                setNumOfTickets(e.target.value);
                setPrice(e.target.value * movie[0].price);
                setTotalPrice(
                  food * numberOfFood + e.target.value * movie[0].price
                );
              }}
            />
          </div>
          <div className="flex justify-between items-center gap-5 my-2">
            <p className="text-lg">Phone: </p>
            <input
              type="tel"
              placeholder="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="px-3 py-1.5 rounded border-b border-gray-400"
            />
          </div>
          <div className="flex justify-between items-center gap-5 my-2">
            <h1 className="text-lg">Food: </h1>
            <div className="flex gap-2">
              <select
                onChange={(e) => {
                  setFood(e.target.value);
                  setNumOfFood(0);
                }}
                className="px-2 py-1 bg-gray-200 rounded-md text-lg"
              >
                <option value="">choose</option>
                {foods.map((food) => (
                  <option value={food.price} key={food.title}>
                    {food.title} - {food.price}$
                  </option>
                ))}
              </select>
              {food !== 0 && (
                <input
                  type="number"
                  value={numberOfFood}
                  className="w-12 bg-gray-200 px-1.5"
                  onChange={(e) => {
                    setNumOfFood(e.target.value);
                    setTotalPrice(price + e.target.value * food);
                  }}
                />
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-lg">Times: </h1>
            <select
              className="px-2 py-1 bg-gray-200"
              onChange={handleTimeChange}
            >
              {movie[0].times.map((item, index) => (
                <option key={index} value={item.time}>
                  {item.time}
                </option>
              ))}
            </select>
          </div>
          <p className="text-lg">
            Total Price:
            <span className="ml-2 text-gray-500">${totalPrice}</span>
          </p>
        </form>
        <div className="flex my-3 rounded-md">
          <Seats handlePostions={handlePostions} seats={seats} />
        </div>
        <button
          onClick={addToCart}
          className="w-[120px] py-1.5 rounded-md text-base font-medium mx-auto my-2 text-white bg-green-400"
        >
          Add To Cart
        </button>
      </div>
    </section>
  );
};

export default Order;
