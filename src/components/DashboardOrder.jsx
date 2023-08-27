const DashboardOrder = ({ order, setCart }) => {
  let users = JSON.parse(localStorage.getItem('users'));
  let auth = JSON.parse(localStorage.getItem('auth'));
  let isAdmin = auth.admin;
  let user = users.filter((item) => item.id === auth.id)[0];
  const cancleOrder = () => {
    let newAuth = auth.orders.filter((item) => item.id !== order.id);
    auth.orders = newAuth;
    localStorage.setItem('auth', JSON.stringify(auth));
    user.orders = newAuth;
    let newUsers = users.map((item) =>
      item.id === auth.id ? (item = user) : item
    );
    localStorage.setItem('users', JSON.stringify(newUsers));
    !isAdmin &&
      setCart(JSON.parse(localStorage.getItem('auth'))?.orders.length);
  };
  return (
    <div className="flex flex-col gap-3 bg-white px-5 py-3 my-2 rounded-md">
      <h1 className="text-lg font-medium">{order.movie}</h1>
      <p className="text-gray-500">Price: {order.price}$</p>
      <p className="text-gray-500">Time: {order.time}</p>
      <p className="text-gray-500">Number Of Tickets: {order.numOfTickets}</p>
      <button
        className="w-[120px] py-1.5 rounded-md text-base font-medium mr-3 text-white bg-red-400"
        onClick={cancleOrder}
      >
        Cancel Order
      </button>
    </div>
  );
};

export default DashboardOrder;
