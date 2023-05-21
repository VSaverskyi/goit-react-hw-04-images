import { Component } from "react";
import { ButtonWrapper } from "./Button.styled";
import PropTypes from "prop-types";

class Button extends Component {
    render() {
        return (
        <ButtonWrapper type="button" onClick={this.props.onClick}>{this.props.children}</ButtonWrapper>
    )}
}

export default Button;

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
}