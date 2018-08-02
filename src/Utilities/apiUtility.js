import axios from 'axios';
import pathToRegexp from 'path-to-regexp';

const urlPrefix = 'http://localhost:8080/api';

const commonApi = axios.create({
  baseURL: urlPrefix,
});

const api = async (originalArgs) => {
  try {
    const { urlParams } = originalArgs;
    const args = { ...originalArgs };
    delete args.urlParams;

    if (urlParams) {
      args.url = pathToRegexp.compile(args.url)(urlParams);
    }

    const response = await commonApi(args);
    return response.data;
  } catch (e) {
    console.error(e);
    return {
      error: {
        code: '',
      },
    };
  }
};

export default {
  api,
};
