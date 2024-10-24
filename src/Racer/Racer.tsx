import React, { useState } from 'react';
import { text } from '../app.constants';
import { ValidationResponse } from '../app';
import TextViewer from './components/TextViewer';
import MorseKey from './components/MorseKey';

const Racer: React.FC<{}> = () => {
    const [validations, setValidation] = useState<ValidationResponse[]>(Array(text.length).fill('pending'));
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const onMorseKeyDown = () => {

    };

    const onMorseKeyUp = () => {
        const isValid = Math.random() > 0.5;
        validations[currentIndex] = isValid ? 'valid' : 'invalid';
        setValidation([...validations]);
        setCurrentIndex(currentIndex + 1);
    };
    
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <TextViewer
                characters={text.split('')}
                validations={validations}
                currentIndex={currentIndex}
            />
            <MorseKey
                onMorseKeyDown={onMorseKeyDown}
                onMorseKeyUp={onMorseKeyUp}
            />
        </div>
    )
};

export default Racer;
