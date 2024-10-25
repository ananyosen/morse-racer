import React from 'react';
import { IMorseDisplay } from '../Racer.interfaces';

const MorseDisplay: React.FC<IMorseDisplay> = (props) => {
    const {
        morseBuffer,
    } = props;

    return (
        <div
            style={{
                border: '2px solid black',
                borderRadius: '4px',
                padding: '16px',
                width: '300px',
                marginTop: '16px',
                height: '42px',
            }}
        >
            <span
                style={{
                    letterSpacing: '8px',
                    fontSize: '32px',
                    fontWeight: 'bold',
                }}
            >
                {morseBuffer}
            </span>
        </div>
    );
};

export default MorseDisplay;
