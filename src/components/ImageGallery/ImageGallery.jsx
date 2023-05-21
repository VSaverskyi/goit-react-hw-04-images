import { Component } from "react";
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

// let page;
const perPage = 12;

class ImageGallery extends Component {
    state = {
        images: [],
        error: '',
        status: Status.IDLE,
        buttonIsActive: true,
        pageNumber: 1,
    };

    async componentDidUpdate(prevProps, prevState) {
        const prevSearch = prevProps.searchingImage;
        const nextSearch = this.props.searchingImage;
        const prevPage = prevState.pageNumber;
        const { pageNumber, buttonIsActive } = this.state;

        if (prevSearch !== nextSearch) {
            this.setState({ status: Status.PENDING });

            this.setState({ pageNumber: 1 });

            try {
                const response = await pixabayApi.fetchImages(nextSearch, pageNumber, perPage);
                const images = response.data.hits;
                this.setState({ images, status: Status.RESOLVED });
            } catch (error) {
                this.setState({ error, status: Status.REJECTED });
            } 
        }

        if (prevPage < pageNumber) {
            if (!buttonIsActive) {
                return alert('Searching data is out of valid range');
            }
            try {
                const response = await pixabayApi.fetchImages(nextSearch, pageNumber, perPage);
                const totalPage = response.data.totalHits / perPage;
                if (pageNumber > totalPage) {
                    this.setState({buttonIsActive: false});
                }
                const newImages = response.data.hits;
                
                this.setState((prevState) => ({images: [...prevState.images, ...newImages]}))
            } catch (error) {
                return <ImagesErrorView message={error.message}/>;
            } 
        }
    }

    handleLoadMoreBtnClick = () => {

        this.setState(({pageNumber}) => ({ pageNumber: pageNumber + 1 }));
    }

    render() {
        const { images, error, status } = this.state;

        if (status === 'pending') {
            return <ImagesPendingView/>;
        }

        if (status === 'rejected') {
            return <ImagesErrorView message={error.message}/>;
        }

        if (status === 'resolved') {
            return <ImagesDataView images={images} onClick={this.handleLoadMoreBtnClick} />;
        }
    }
}

export default ImageGallery;

ImageGallery.propTypes = {
    searchingImage: PropTypes.string.isRequired
}