import axios from 'axios';

const fetchArticlesWithQuery = (searchQuery, page = 0) => {
  return axios
    .get(
      `https://pixabay.com/api/?key=16588925-02413834d9828552035921ade&q=${searchQuery}&image_type=photo&page=${page + 1}&per_page=12`
    )
    .then((response) => response.data.hits);
};

export default {
  fetchArticlesWithQuery,
};
