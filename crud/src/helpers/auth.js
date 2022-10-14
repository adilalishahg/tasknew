import cookie from 'js-cookie';
import process from 'process';

export const setcookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};
export const removecookie = (key) => {
  if (process.browser) {
    cookie.set(key);
  }
};
export const getcookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

export const authenticate = (response, next) => {
  setcookie('token', response.data.user._id);
  next();
};
export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getcookie('token');
    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
      } else {
        return false;
      }
    }
  }
};
