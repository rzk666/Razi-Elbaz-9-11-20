/* eslint-disable no-unused-expressions */
// Utils
import HttpRequest from '../utils/HttpRequest';
// Libs
import { sleep } from '../common/libs';
// TYPE
export const API = 'API';

// ACTION
export const httpRequestAction = async (action, dispatch, token) => {
  const {
    url,
    method = 'get',
    data = {},
    params = {},
    success,
    failure,
    loader,
    // This is for simulation purposes
    fakeWaitTime,
  } = action.payload;

  const { base, endpoint } = url;
  !loader || dispatch(loader(true));
  const options = {
    method,
    url: base ? base + endpoint : endpoint,
  };
  if (Object.keys(data).length) { options.data = data; }
  if (Object.keys(params).length) { options.params = params; }
  try {
    const res = await HttpRequest(token)(options);
    await sleep(fakeWaitTime || 1);
    dispatch(success(res.data));
    !loader || dispatch(loader(false));
  } catch (e) {
    dispatch(failure(e.message || ''));
  }
};

export const api = (action) => (dispatch) => httpRequestAction(action, dispatch);
