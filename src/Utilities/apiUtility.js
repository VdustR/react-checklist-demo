import axios from 'axios';

const urlPrefix = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: urlPrefix,
});

export default {
  api,
};
