import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardOrder from './DashboardOrder';
const ManageOrders = () => {
  // let { orders, username } = JSON.parse(localStorage.getItem('auth'));
  let users = JSON.parse(localStorage.getItem('users'));
  let isAdmin = JSON.parse(localStorage.getItem('auth')).admin;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section>
      {/* orders */}
      <div className="container mx-auto px-5 py-3 my-4 rounded-md min-h-screen bg-gray-200">
        <div className="flex justify-around items-center">
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
        {isAdmin && (
          <>
            {users.map((user) =>
              user.orders.map((order) => (
                // <h1>sayed</h1>
                <DashboardOrder key={order} order={order} />
              ))
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ManageOrders;
