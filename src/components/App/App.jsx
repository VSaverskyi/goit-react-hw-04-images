import React, {useState, useEffect} from "react";
import SearchBar from "../Searchbar";
import { Container } from "./App.styled";
import ImageGallery from "components/ImageGallery";
import pixabayApi from '../../services/pixabay-api';

const Status = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
};

const perPage = 12;

const App = () => {

  const [searchingImage, setSearchingImage] = useState('');
  const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(Status.IDLE);
    const [buttonIsActive, setButtonIsActive] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);

  const handleFormSubmit = searchingImage => {
    setPageNumber(1);
    setImages([]);
    setSearchingImage(searchingImage);
  };

    useEffect(() => {
        if (searchingImage) {
            const fetchResponse = async () => {
            setStatus(Status.PENDING);
              const response = await pixabayApi.fetchImages(searchingImage, pageNumber, perPage);
              const totalPages = Math.floor(response.data.totalHits / perPage);
            
              if (pageNumber > totalPages) {
                  setButtonIsActive(false);
              }
            
              if (pageNumber === 1) {
                setImages(response.data.hits);
              } else {
                setImages(prevImages => [...prevImages, ...response.data.hits]);
              }
            setStatus(Status.RESOLVED);
        }

            try {
            fetchResponse();
        }
        catch (error) {
            setError(error);
            setStatus(Status.REJECTED);
        }
        } 

    }, [searchingImage, pageNumber]);

    const handleLoadMoreBtnClick = () => {
        setPageNumber(prevPageNumber => prevPageNumber + 1);
    };

  return (
    <Container>
      <SearchBar onSubmit={handleFormSubmit} />
      <ImageGallery
        status={status}
        buttonIsActive={buttonIsActive}
        images={images}
        error={error}
        pageNumber={pageNumber}
        handleLoadMoreBtnClick={handleLoadMoreBtnClick}
       />
    </Container>
    );
};

export default App;
