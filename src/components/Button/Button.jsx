import React from "react";
import { ButtonWrapper } from "./Button.styled";
import PropTypes from "prop-types";

const Button = ({onClick, children}) => {
    return (
        <ButtonWrapper type="button" onClick={onClick}>{children}</ButtonWrapper>
    )
}

export default Button;

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}