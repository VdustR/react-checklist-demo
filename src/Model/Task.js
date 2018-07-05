import apiUtility from 'Src/Utilities/apiUtility';

const { api } = apiUtility;

const query = async () => api.get('tasks');

export default {
  query,
};
