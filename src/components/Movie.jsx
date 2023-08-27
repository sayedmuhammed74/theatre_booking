// react router
import { Link } from 'react-router-dom';

// icons
import { AiFillHeart } from 'react-icons/ai';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { TbTicket } from 'react-icons/tb';

// farmer motion
import { motion } from 'framer-motion';

const Movie = ({ movie }) => {
  return (
    <div className="md:w-1/5 flex flex-col p-3 shadow-xl space-y-1 justify-between rounded-2xl h-[350px] relative">
      <img src={movie?.image} alt={movie?.title} className={`aspect-square`} />
      <div className="flex justify-between">
        <h1 className="font-medium text-lg">
          <Link to={`/movies`}>{movie?.title}</Link>
        </h1>
        <span className="font-medium text-lg">{movie?.rate}</span>
      </div>
      <p className="text-slate-500 text-left">{movie?.desc}</p>
      <div className="flex text-yellow-500">
        {/* {Array(product.rate)
          .fill(1)
          .map((star, index) => (
            <BsStarFill key={index} />
          ))} */}
        <BsStarFill />
        <BsStarFill />
        <BsStarFill />
        <BsStarHalf />
        <BsStar />
      </div>

      <div className="flex justify-between px-2 py-3">
        {/* like icon */}
        <motion.div whileTap={{ scale: 1.1 }}>
          <AiFillHeart
            onClick={(e) => e.target.classList.toggle('text-red-500')}
            className="text-2xl cursor-pointer hover:opacity-90 text-gray-300"
          />
        </motion.div>

        {/* cart icon */}
        <motion.div
          whileTap={{
            scale: 1.1,
            color: '#182032',
          }}
          transition={{ duration: 0.6 }}
        >
          <Link to={`/order/${movie.slug}`}>
            <TbTicket className="text-[26px] cursor-pointer hover:opacity-90 text-slate-900 hover:text-red-500 duration-100 ease-out" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Movie;
