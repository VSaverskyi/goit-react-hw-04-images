import React, { useEffect } from "react";
import { Overlay, ModalWrapper } from "./Modal.styled";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {
    useEffect(() => {
        const hahdlePressESC = e => {
            if (e.code === 'Escape') {
                onClose();
            }
        }
        
        window.addEventListener('keydown', hahdlePressESC);

        return () => {
        window.removeEventListener('keydown', hahdlePressESC);
      }
    }, [onClose]);
    
    const handleOverlayClick = event => {
        if (event.currentTarget === event.target) {
            onClose();
        }
    }

    return createPortal(
        <Overlay onClick={handleOverlayClick}>
            <ModalWrapper>
                {children}
            </ModalWrapper>
        </Overlay>,
        modalRoot,
    );
}

export default Modal;

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}