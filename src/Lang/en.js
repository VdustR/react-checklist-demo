export default {
  apiError: {
    '': 'Network error.',
  },
  page: {
    total: (number) => {
      if (number > 1) {
        return `${number} results`;
      }

      return `${number} result`;
    },
  },
  list: {
    empty: 'There is nothing matched',
  },
  time: {
    created: 'Created Time',
    updated: 'Last Modified Time',
  },
};
