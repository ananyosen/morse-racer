import React, { useEffect } from 'react';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { IConfigModalProps } from '../Racer.interfaces';
import { keyboardBinding } from '../../../constants/app.constants';
import '../Racer.css';

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
        <Modal
            open={open}
            onClose={closeModal}
            center
            closeOnEsc={false}
            closeOnOverlayClick={false}
            showCloseIcon={false}
            styles={{
                modal: {
                    // background: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                    borderRadius: '2rem',
                    height: 300,
                }
            }}
        >
            <div
                style={{
                    marginTop: '2rem',
                    fontSize: '1.5rem',
                    fontFamily: '"Courier Prime", monospace',
                    color: '#212121',
                    textAlign: 'center',
                }}
            >
                <span>
                    Press key "[{keyboardBinding}]" or click/tap anywhere to start
                </span>
            </div>
        </Modal>
    )
};

export default ConfigModal;
