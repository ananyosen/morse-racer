import React, { useEffect } from 'react';
import { IConfigModalProps } from '../Racer.interfaces';
import { keyboardBinding } from '../../../constants/app.constants';

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
        <h1>test</h1>
    )
};

export default ConfigModal;
