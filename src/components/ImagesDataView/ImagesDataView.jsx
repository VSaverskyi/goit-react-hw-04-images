import GalleryItemImg from "components/GalleryItemImg";
import { ImageGalleryList } from "components/ImageGallery/ImageGallery.styled";
import ImageGalleryItem from "components/ImageGalleryItem";
import Button from "components/Button";
import React, {useState} from "react";
import Modal from "components/Modal";
import PropTypes from "prop-types";

const ImagesDataView = ({images, onClick}) => {

    const [showModal, setShowModal] = useState(false);
    const [largeImageURL, setLargeImageURL] = useState('');
    const [tags, setTags] = useState('');

    const toggleModal = () => {
        setShowModal((prevShowModal) => !prevShowModal);
    }

    const handleItemClick = (largeImageURL, tags) => {
        setLargeImageURL(largeImageURL);
        setTags(tags);
        toggleModal();
    }

        return (
        <div>
            {images.length === 0 ? <p>Images not found!</p> :
            <ImageGalleryList>
                {
                images.map(({id, largeImageURL, tags, webformatURL}) => {
                    return (
                        <ImageGalleryItem key={id}
                            onClick={handleItemClick}
                            largeImageURL={largeImageURL}
                            tags={tags}>
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
            {showModal &&
                <Modal
                onClose={toggleModal}>
                <img src={largeImageURL} alt={tags} />
                </Modal>
            }
        </div>
    )
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