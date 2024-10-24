import React from 'react';
import { IMorseKeyProps } from '../Racer.interfaces';

const MorseKey: React.FC<IMorseKeyProps> = (props) => {
    const {
        onMorseKeyUp,
    } = props;
    return (
        <div
            style={{
                padding: '16px',
                marginTop: '32px',
                border: '1px solid black',
                borderRadius: '4px',
                cursor: 'pointer'
            }}
            autoFocus
            tabIndex={0}
            onKeyUp={onMorseKeyUp}
        >
            PRESS
        </div>
    )
};

export default MorseKey;
