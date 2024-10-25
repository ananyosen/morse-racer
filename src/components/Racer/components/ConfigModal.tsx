import React, { useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { IConfigModalProps } from '../Racer.interfaces';
import { keyboardBinding } from '../../../app.constants';

const ConfigModal: React.FC<IConfigModalProps> = (props) => {
    const {
        open,
        closeModal,
    } = props;

    useEffect(() => {
        const keypressHandler = (e: KeyboardEvent) => {
            if (e.code === keyboardBinding) {
                closeModal();
            }
        };

        document.body.addEventListener('keyup', keypressHandler);

        return () => {
            document.body.removeEventListener('keyup', keypressHandler);
        }
    }, [closeModal]);

    return (
        <Modal
            open={open}
            onClose={closeModal}
        >
            <h2>Hello</h2>
        </Modal>
    )
};

export default ConfigModal;
