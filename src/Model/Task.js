import apiUtility from 'Src/Utilities/apiUtility';

const { api } = apiUtility;

const query = async () => api({
  method: 'get',
  url: 'tasks',
});

export default {
  query,
};
