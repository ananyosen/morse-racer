import React, { useState, useRef } from 'react';
import { baseTime, keyboardBinding, slopPercentage, text } from '../app.constants';
import { ValidationResponse } from '../app';
import TextViewer from './components/TextViewer';
import MorseKey from './components/MorseKey';
import { getMorseCodeFromTime } from '../app.utils';

const Racer: React.FC<{}> = () => {
    const [validations, setValidation] = useState<ValidationResponse[]>(Array(text.length).fill('pending'));
    const [currentIndex, setCurrentIndex] = useState(0);
    const morseBuffer = useRef<string>('');
    const timestamp = useRef<number>(0);
    const charCompleteTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
    
    const onMorseKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.code !== keyboardBinding) {
            return;
        }
        if(charCompleteTimeoutRef.current) {
            clearTimeout(charCompleteTimeoutRef.current);
        }
        timestamp.current = new Date().getTime();
    };

    const charCompleteCallback = () => {
        console.log('morse code ', morseBuffer.current);
    }

    const onMorseKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.code !== keyboardBinding) {
            return;
        }
        // const isValid = Math.random() > 0.5;
        // validations[currentIndex] = isValid ? 'valid' : 'invalid';
        // setValidation([...validations]);
        // setCurrentIndex(currentIndex + 1);
        const diffTime = new Date().getTime() - timestamp.current;
        const morseCode = getMorseCodeFromTime(diffTime, baseTime, slopPercentage);
        morseBuffer.current += morseCode;
        charCompleteTimeoutRef.current = setTimeout(charCompleteCallback, baseTime * 3);
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
