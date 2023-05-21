import GalleryItemImg from "components/GalleryItemImg";
import { ImageGalleryList } from "components/ImageGallery/ImageGallery.styled";
import ImageGalleryItem from "components/ImageGalleryItem";
import Button from "components/Button";
import { Component } from "react";
import Modal from "components/Modal";
import PropTypes from "prop-types";

class ImagesDataView extends Component {
    state = {
        showModal: false,
        largeImageURL: '',
        tags: '',
    }

    toggleModal = () => {
        this.setState(state => ({
        showModal: !state.showModal
        }
        ))
    }

    handleItemClick = (largeImageURL, tags) => {
        this.setState({ largeImageURL, tags });
        this.toggleModal();
    }

    render() {
        const { images, onClick } = this.props;
        const { largeImageURL, tags } = this.state;
        return (
        <div>
            {images.length === 0 ? <p>Images not found!</p> :
            <ImageGalleryList>
                {
                images.map(({id, largeImageURL, tags, webformatURL}) => {
                    return (
                        <ImageGalleryItem key={id} onClick={this.handleItemClick} largeImageURL={largeImageURL} tags={tags}>
                            <GalleryItemImg
                                url={webformatURL}
                                description={tags}
                            />
                        </ImageGalleryItem>
                    )
                })
                }
                <Button onClick={onClick}>Load more</Button>
            </ImageGalleryList>
            }
            {this.state.showModal &&
                <Modal
                onClose={this.toggleModal}>
                <img src={largeImageURL} alt={tags} />
                </Modal>
            }
        </div>
    )
    }
    
}

export default ImagesDataView;

ImagesDataView.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            webformatURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
        }),
    ),
    onClick: PropTypes.func.isRequired,
}