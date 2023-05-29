import React from "react";
import { ImageGalleryListItem } from "./ImageGalleryItem.styled";
import PropTypes from "prop-types";

const ImageGalleryItem = ({onClick, largeImageURL, tags, children}) => {
    return (
        <ImageGalleryListItem onClick={() => onClick(largeImageURL, tags)} >{children}</ImageGalleryListItem>
    )
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}