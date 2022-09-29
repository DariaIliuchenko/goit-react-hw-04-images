import {useState, useEffect} from 'react';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import s from './App.module.css';
import ImageGallery from './ImageGalleryItem/ImageGallery'
import getImages from '../servises/imagesApi';
import Notiflix from 'notiflix';
import Loader from './Loader/Loader';

export const App = () => {
  
  const [searchQuery, setSearchQuery] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isShown, setIsShown] = useState(false);


  useEffect(() => {
       
    const getData = async () => {
    
    try {
      
      const response = await getImages(searchQuery, page);
      if (!response.totalHits) Notiflix.Notify.failure('No results, please, try again');
      setImages(prevImages => [...prevImages, ...response.hits]);
      setTotalHits (response.totalHits);
      setIsLoading(false);
      
    } catch (error) {
      this.setState({ error });
      Notiflix.Notify.failure('Error');
    }
  };

   if (isShown) {
      setIsLoading(true);
      getData();
    }
  }, [searchQuery, page, isShown]);

  const onFormSubmit = async search => {
    setSearchQuery(search);
    setPage(1);
    setImages([]);
    setIsShown(true);
  };

  const handleClick = async () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={onFormSubmit} />
      {isShown && <ImageGallery data={images} />}
      {!isLoading && images.length > 0 && images.length < totalHits && (
        <Button onClick={handleClick} />
      )}
      {isLoading && <Loader />}
    </div>
  );
};