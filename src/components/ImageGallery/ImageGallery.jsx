import { useEffect } from "react";
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

const ImageGallery = ({status, buttonIsActive, images, error, handleLoadMoreBtnClick}) => {

    useEffect(() => {
        if (!buttonIsActive) {
            return alert('Searching data is out of valid range');
        }
    },[buttonIsActive])


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
    status: PropTypes.string.isRequired,
    buttonIsActive: PropTypes.bool.isRequired,
    images: PropTypes.array.isRequired,
    error: PropTypes.shape({
      message: PropTypes.string.isRequired
    }),
    handleLoadMoreBtnClick: PropTypes.func.isRequired
}
