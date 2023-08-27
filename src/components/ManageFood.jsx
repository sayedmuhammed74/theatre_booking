import { useState } from 'react';
import { Link } from 'react-router-dom';

const ManageFood = () => {
  const [foods, setFoods] = useState(JSON.parse(localStorage.getItem('foods')));
  const deleteFood = (e) => {
    let newFoods = foods.filter((item) => item.id != e.target.id);
    localStorage.setItem('foods', JSON.stringify(newFoods));
    setFoods(newFoods);
  };
  return (
    <section>
      <div className="container flex flex-col mx-auto px-5 py-3 my-4 rounded-md min-h-screen bg-gray-200">
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
        {/* manage foods */}
        <button className="w-[120px] py-1.5 my-3 rounded-md text-base font-medium text-white bg-blue-400">
          <Link to="/addfood">Add Food</Link>
        </button>
        {foods.map((food) => (
          <div
            key={food.id}
            className="w-[300px] mx-auto flex justify-between items-center px-4 py-2 bg-white rounded-md"
          >
            <p className="text-lg font-medium text-slate-900">{food.title}</p>
            <button
              className="w-[80px] py-1 rounded-md text-base font-medium text-white bg-green-400"
              onClick={deleteFood}
              id={food.id}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ManageFood;
