import React, { useState, useRef, useEffect } from 'react';
import { baseTime, keyboardBinding, MORSE_TO_CHAR_MAP, slopPercentage, text } from '../app.constants';
import { ValidationResponse } from '../app';
import TextViewer from './components/TextViewer';
import MorseKey from './components/MorseKey';
import { getMorseCodeFromTime } from '../app.utils';
import MorseDisplay from './components/MorseDisplay';

const Racer: React.FC<{}> = () => {
    const [validations, setValidation] = useState<ValidationResponse[]>(Array(text.length).fill('pending'));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [morseBuffer, setMorseBuffer] = useState<string>('');
    const morseBufferRef = useRef<string>(morseBuffer);
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
        const parsedChar = MORSE_TO_CHAR_MAP[morseBufferRef.current];
        const isValidInput = text.charAt(currentIndex).toUpperCase() === parsedChar;
        validations[currentIndex] = isValidInput ? 'valid' : 'invalid';
        setValidation([...validations]);
        setCurrentIndex(currentIndex + 1);
        setMorseBuffer('');
    }

    const onMorseKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.code !== keyboardBinding) {
            return;
        }
        const diffTime = new Date().getTime() - timestamp.current;
        console.log('diff: ', diffTime);
        const morseCode = getMorseCodeFromTime(diffTime, baseTime, slopPercentage);
        setMorseBuffer(morseBuffer + morseCode);
        charCompleteTimeoutRef.current = setTimeout(charCompleteCallback, baseTime * 3);
    };

    useEffect(() => {
        morseBufferRef.current = morseBuffer;
    }, [morseBuffer]);

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
            <MorseDisplay
                morseBuffer={morseBuffer}
            />
            <MorseKey
                onMorseKeyDown={onMorseKeyDown}
                onMorseKeyUp={onMorseKeyUp}
            />
        </div>
    )
};

export default Racer;
