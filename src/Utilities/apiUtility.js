import axios from 'axios';

const urlPrefix = 'http://localhost:8080/api';

const api = async (...args) => {
  try {
    return await axios.create({
      baseURL: urlPrefix,
    })(...args);
  } catch (e) {
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
