import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import s from './App.module.css';
import ImageGallery from './ImageGalleryItem/ImageGallery'
import getImages from '../servises/imagesApi';
import Notiflix from 'notiflix';
import Loader from './Loader/Loader';

export default class App extends React.Component {

  state = {
    searchQuery: null,
    images: [],
    page: 1,
    totalHits: 0,
    isLoading: false,
    error: null,
  };

  queryImage = async searchQuery => {
    if (this.state.searchQuery === searchQuery)
      return Notiflix.Notify.warning('Search query is invalid');
    this.setState({ isLoading: true });

    try {
      const {
        data: { hits, totalHits }
      } = await getImages(searchQuery, 1);
      if (!totalHits) Notiflix.Notify.failure('No results, please, try again');
      this.setState(_ => ({
        searchQuery,
        images: [...hits],
        page: 1,
        totalHits: totalHits,
        isLoading: false,
      }));
    } catch (error) {
      this.setState({ error });
      Notiflix.Notify.failure('Error');
    }
  };

  clickHandler = async () => {
    try {
      const { page, searchQuery } = this.state;
      this.setState({ isLoading: true });

      const {
        data: { hits },
      } = await getImages(searchQuery, page + 1);
      if (hits.length === 0) Notiflix.Notify.failure('No results, please, try again');

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        page: prevState.page + 1,
        isLoading: false,
      }));
    } catch (error) {
      this.setState({ error});
      Notiflix.Notify.failure('Error');
    }
  };

  render() {
    const { images, isLoading, error } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.queryImage} />
        {error && <h2>Error, please, try again</h2>}
        <ImageGallery data={images}/>
        {!isLoading && images.length !== 0 && (
        <Button clickHandler={this.clickHandler} />)}
        { isLoading && <Loader />}
      </div>
    );
  }
}