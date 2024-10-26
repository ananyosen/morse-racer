import React from 'react';
import { IMorseDisplay } from '../Racer.interfaces';

const MorseDisplay: React.FC<IMorseDisplay> = (props) => {
    const {
        morseBuffer,
    } = props;

    return (
        <div
            style={{
                marginTop: '2rem',
                userSelect: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: '2rem',
                fontWeight: 'bold',
                fontFamily: '"Courier Prime", monospace',
                color: 'white',
                gap: '0.5rem',
            }}
        >
            <span
                style={{
                    textAlign: 'center',
                }}
            >
                Current Sequence ⏷
            </span>
            <div
                style={{
                    height: '3rem',
                    minWidth: '10rem',
                    borderBottom: '0.2rem solid white',
                    textAlign: 'center'
                }}
            >
                <span
                    style={{
                        letterSpacing: '0.5rem',
                    }}
                >
                    {morseBuffer?.replaceAll('.', '·').replaceAll('-', '–')}
                </span>
            </div>
        </div>
    );
};

export default MorseDisplay;
