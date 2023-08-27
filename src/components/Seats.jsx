import { MdEventSeat } from 'react-icons/md';
const Seats = ({ handlePostions, seats }) => {
  let { booked } = seats;

  return (
    <div className="flex justify-between items-center flex-wrap w-10/12 mx-auto py-4 bg-gray-50 text-gray-500">
      {new Array(25)
        .fill(0)
        .map((item, index) =>
          booked.positions.includes(index + 1) ? (
            <MdEventSeat
              key={index}
              className="text-5xl text-yellow-500 w-1/5"
            />
          ) : (
            <MdEventSeat
              key={index}
              position={index + 1}
              onClick={handlePostions}
              className="text-5xl w-1/5 hover:text-yellow-500 ease-in duration-100 cursor-pointer"
            />
          )
        )}
    </div>
  );
};

export default Seats;
