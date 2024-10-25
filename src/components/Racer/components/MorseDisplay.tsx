import React from 'react';
import { IMorseDisplay } from '../Racer.interfaces';

const MorseDisplay: React.FC<IMorseDisplay> = (props) => {
    const {
        morseBuffer,
    } = props;

    return (
        <div
            style={{
                marginTop: '32px',
                userSelect: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: '32px',
                fontWeight: 'bold',
                fontFamily: '"Courier Prime", monospace',
                color: 'white',
                gap: '8px',
            }}
        >
            <span>
                ⏷ Current Sequence
            </span>
            <div
                style={{
                    height: '48px',
                    minWidth: '160px',
                    borderBottom: '3px solid white',
                    textAlign: 'center'
                }}
            >
                <span
                    style={{
                        letterSpacing: '8px',
                    }}
                >
                    {morseBuffer?.replaceAll('.', '·').replaceAll('-', '–')}
                </span>
            </div>
        </div>
    );
};

export default MorseDisplay;
