import React, { Component } from "react";
import Spinner from "./Spinner";
// import Notification from "./Notification";
// import ArticleList from "./ArticleList";
import SearchForm from "./SearchForm";
import articlesApi from "./articlesApi";
import Modal from "./Modal";
import styles from "./Galery.module.css";

export default class ImageFinder extends Component {
  state = {
    articles: [],
    loading: false,
    error: null,
    searchQuery: "",
    page: 0,
    largeImageURL: null,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    if (prevQuery !== nextQuery) {
      this.fetchArticles();
    }
  }

  fetchArticles = () => {
    const { searchQuery, page } = this.state;

    this.setState({ loading: true });

    articlesApi
      .fetchArticlesWithQuery(searchQuery, page)
      .then((articles) =>
        this.setState((prevState) => ({
          articles: [...prevState.articles, ...articles],
          page: prevState.page + 1,
        }))
      )
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleSearchFormSubmit = (query) => {
    this.setState({
      searchQuery: query,
      page: 0,
      articles: [],
    });
  };

  toggleModal = (event) => {
    const { target } = event;
    console.log(target.alt);
    this.setState((state) => ({
      showModal: !state.showModal,
      largeImageURL: target.alt,
    }));
  };

  render() {
    const { articles, loading, showModal } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.handleSearchFormSubmit} />
        {/* {error && (
          <Notification
            message={`Woops, something went wrong: ${error.message}`}
          />
        )} */}

        {articles.length > 0 && (
          <ul className={styles.position}>
            {articles.map(({ id, webformatURL, largeImageURL }) => (
              <li className={styles.pictures} key={id}>
                <img
                  onClick={this.toggleModal}
                  className={styles.tofit}
                  src={webformatURL}
                  alt={largeImageURL}
                  width="150"
                  height="84"
                />
              </li>
            ))}
          </ul>
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <div>
              <img
                src={this.state.largeImageURL}
                alt=""
                width="350"
                height="auto"
              />
            </div>
            <button type="button" onClick={this.toggleModal}>
              Close modal
            </button>
          </Modal>
        )}
        {loading && <Spinner message="Loading..." />}

        {articles.length > 0 && !loading && (
          <button type="button" onClick={this.fetchArticles}>
            Load more
          </button>
        )}
      </>
    );
  }
}
