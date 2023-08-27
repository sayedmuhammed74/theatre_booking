import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddFood = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const handleAddFood = () => {
    let food = {
      id: Math.round(Math.random() * 10000),
      title,
      price,
    };
    let foods = JSON.parse(localStorage.getItem('foods'));
    if (title && price) {
      foods.push(food);
      localStorage.setItem('foods', JSON.stringify(foods));
      navigate('/dashboard/foods');
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
            type="number"
            placeholder="price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="border-b border-gray-400 rounded px-3 py-1.5"
          />
          <button
            className="w-[100px] py-1.5 rounded-md text-base font-medium mx-auto text-white bg-blue-500"
            onClick={handleAddFood}
          >
            Add
          </button>
        </div>
      </div>
    </section>
  );
};

export default AddFood;
