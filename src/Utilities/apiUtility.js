import axios from 'axios';

const urlPrefix = 'http://localhost:8080/api';

const api = async (...args) => {
  try {
    const response = await axios.create({
      baseURL: urlPrefix,
    })(...args);
    return response.data;
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
