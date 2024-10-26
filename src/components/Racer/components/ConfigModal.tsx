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
        document.body.addEventListener('pointerup', closeModal);

        return () => {
            document.body.removeEventListener('keyup', keypressHandler);
            document.body.removeEventListener('pointerup', closeModal);
        }
    }, [closeModal]);

    return (
        <div
            style={{
                marginTop: '2rem',
                fontSize: '1.5rem',
                fontFamily: '"Courier Prime", monospace',
                color: 'white',
                textAlign: 'center',
            }}
        >
            <span>
                Press key "[{keyboardBinding}]" or click/tap anywhere to start
            </span>
        </div>
    )
};

export default ConfigModal;
