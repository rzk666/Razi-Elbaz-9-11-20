import axios from 'axios';

const HttpRequest = (token) => {
  const options = token
    ? {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    : {};
  return axios.create(options);
};

export default HttpRequest;
