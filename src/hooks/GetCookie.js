import Cookies from 'js-cookie';

const GetCookie = (cookieName) => {
  Cookies.get(cookieName);
};

export default GetCookie;
