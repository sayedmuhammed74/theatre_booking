import { useEffect } from 'react';
import DashboardOrder from './DashboardOrder';

const Cart = ({ setCart }) => {
  let username = JSON.parse(localStorage.getItem('auth'))?.username;
  let orders = JSON.parse(localStorage.getItem('auth'))?.orders;
  let isAdmin = JSON.parse(localStorage.getItem('auth'))?.admin;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section>
      <div className="container mx-auto px-5 py-3 my-4 rounded-md min-h-screen bg-gray-200">
        <h1 className="text-center text-2xl font-medium my-2 text-slate-900">
          Cart - {username}
        </h1>
        {!isAdmin &&
          orders?.map((order) => (
            <DashboardOrder setCart={setCart} key={order} order={order} />
          ))}
      </div>
    </section>
  );
};

export default Cart;
