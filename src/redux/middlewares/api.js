import { API, httpRequestAction } from '../api';

const api = ({ dispatch }) => (next) => (action) => {
  if (action.type !== API) {
    return next(action);
  }
  httpRequestAction(action, dispatch);
};

export default api;
