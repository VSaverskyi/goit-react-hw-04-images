import PropTypes from "prop-types";

const ImagesErrorView = ({ message }) => {
    return (
        <p>Error: {message}</p>
    );
}

export default ImagesErrorView;

ImagesErrorView.propTypes = {
    message: PropTypes.string.isRequired
}