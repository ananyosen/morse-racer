import React from 'react';
import { IMorseKeyProps } from '../Racer.interfaces';

const MorseKey: React.FC<IMorseKeyProps> = (props) => {
    const {
        onMorseKeyDown,
        onMorseKeyUp,
    } = props;

    return (
        <div
            style={{
                padding: '1rem',
                marginTop: '2rem',
                border: '1px solid black',
                borderRadius: '0.25rem',
                cursor: 'pointer'
            }}
            autoFocus
            tabIndex={-1}
            onKeyDown={onMorseKeyDown}
            onKeyUp={onMorseKeyUp}
        >
            PRESS
        </div>
    )
};

export default MorseKey;
