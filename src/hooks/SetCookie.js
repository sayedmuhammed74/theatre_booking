import Cookies from 'js-cookie';

const SetCookie = (cookieName, data) => {
  Cookies.set(cookieName, JSON.stringify(data), {
    expires: 1,
    secure: true,
    sameSite: 'strict',
    path: '/',
  });
};

export default SetCookie;
