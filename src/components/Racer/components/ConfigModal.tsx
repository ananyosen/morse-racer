import React, { useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
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
        <Modal
            open={open}
            onClose={closeModal}
            
        >
            <Card
                sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontFamily: '"Courier Prime", monospace',
                    color: 'white',
                    backgroundImage: 'linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)',
                    padding: '16px',
                }}
            >
                <Stack>
                    <div>
                        <span>Expected average Words per minute</span>
                        <TextField variant='outlined' />
                    </div>
                </Stack>
            </Card>
        </Modal>
    )
};

export default ConfigModal;
