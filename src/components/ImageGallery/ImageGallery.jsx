import { useState, useEffect } from "react";
import pixabayApi from '../../services/pixabay-api';
import ImagesDataView from "components/ImagesDataView";
import ImagesPendingView from "components/ImagesPendingView";
import ImagesErrorView from "components/ImagesErrorView";
import PropTypes from "prop-types";

const Status = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
};

const perPage = 12;

const ImageGallery = ({searchingImage}) => {

    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(Status.IDLE);
    const [buttonIsActive, setButtonIsActive] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        if (!buttonIsActive) {
            return alert('Searching data is out of valid range');
        }
    },[buttonIsActive])

    useEffect(() => {
        setPageNumber(1);
        if (searchingImage) {
            const fetchResponse = async () => {
            setStatus(Status.PENDING);
            const response = await pixabayApi.fetchImages(searchingImage, 1, perPage);
            setImages(response.data.hits);
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

    }, [searchingImage]);

    useEffect(() => {
        if (pageNumber > 1 && searchingImage) {
            const fetchResponseMore = async () => {
                const response = await pixabayApi.fetchImages(searchingImage, pageNumber, perPage);
                const totalPages = Math.floor(response.data.totalHits / perPage);
            
                if (pageNumber > totalPages) {
                    setButtonIsActive(false);
                }

                const responseImages = response.data.hits;

                setImages(prevImages => [...prevImages, ...responseImages]);
            }

            try {
                fetchResponseMore();
            } catch (error) {
                return <ImagesErrorView message={error.message} />;
            }
        }
    }, [pageNumber, searchingImage])
    

    const handleLoadMoreBtnClick = () => {
        setPageNumber(prevPageNumber => prevPageNumber + 1);
    };

    if (status === Status.PENDING) {
        return <ImagesPendingView />;
    }

    if (status === Status.REJECTED) {
        return <ImagesErrorView message={error.message} />;
    }

    if (status === Status.RESOLVED) {
        return <ImagesDataView images={images} onClick={handleLoadMoreBtnClick} />;
    }
}

export default ImageGallery;

ImageGallery.propTypes = {
    searchingImage: PropTypes.string.isRequired
}
