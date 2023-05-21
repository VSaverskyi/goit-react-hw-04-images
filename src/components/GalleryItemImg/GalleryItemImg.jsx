import { ListItemImg } from "./GalleryItemImg.styled";
import PropTypes from "prop-types";

const GalleryItemImg = ({url, description}) => {
    return (
        <ListItemImg src={url} alt={description} />
    )
    
}

export default GalleryItemImg;

GalleryItemImg.propTypes = {
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}