import React, { useState, useRef, useCallback, EventHandler } from 'react';
import { baseTime, keyboardBinding, MORSE_TO_CHAR_MAP, slopPercentage, text } from '../app.constants';
import TextViewer from './components/TextViewer';
import MorseKey from './components/MorseKey';
import { getMorseCodeFromTime } from '../app.utils';
import MorseDisplay from './components/MorseDisplay';
import { IMorseState } from './Racer.interfaces';
import ConfigModal from './components/ConfigModal';

const Racer: React.FC<{}> = () => {
    const [{
        validations,
        currentIndex,
        morseBuffer
    }, setMorseState] = useState<IMorseState>({
        validations: Array(text.length).fill('pending'),
        currentIndex: 0,
        morseBuffer: '',
    });

    const [isModalOpen, setModalOpen] = useState(true);

    const timestamp = useRef<number>(0);
    const charCompleteTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

    const onMorseKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.code !== keyboardBinding) {
            return;
        }
        if(charCompleteTimeoutRef.current) {
            clearTimeout(charCompleteTimeoutRef.current);
        }
        timestamp.current = new Date().getTime();
    }, []);

    const charCompleteCallback = () => {
        setMorseState(({currentIndex, morseBuffer, validations}) => {
            const parsedChar = MORSE_TO_CHAR_MAP[morseBuffer];
            const isValidInput = text.charAt(currentIndex).toUpperCase() === parsedChar;
            validations[currentIndex] = isValidInput ? 'valid' : 'invalid';

            return ({
                validations: [...validations],
                currentIndex: currentIndex + 1,
                morseBuffer: '',
            });
        })
    }

    const onMorseKeyUp = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.code !== keyboardBinding) {
            return;
        }
        const diffTime = new Date().getTime() - timestamp.current;
        console.log('diff: ', diffTime);
        const morseCode = getMorseCodeFromTime(diffTime, baseTime, slopPercentage);
        setMorseState((state) => ({...state, morseBuffer: state.morseBuffer + morseCode}));
        charCompleteTimeoutRef.current = setTimeout(charCompleteCallback, baseTime * 4);
    }, []);

    const openConfigModal = () => {
        document.body.removeEventListener('keyup', onMorseKeyUp as unknown as EventListener);
        document.body.removeEventListener('keydown', onMorseKeyDown as unknown as EventListener);

        setModalOpen(true);
    };

    const closeConfigModal = () => {
        document.body.addEventListener('keyup', onMorseKeyUp as unknown as EventListener);
        document.body.addEventListener('keydown', onMorseKeyDown as unknown as EventListener);

        setModalOpen(false);
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
            <MorseDisplay
                morseBuffer={morseBuffer}
            />
            <MorseKey
                onMorseKeyDown={onMorseKeyDown}
                onMorseKeyUp={onMorseKeyUp}
            />
            {isModalOpen && (
                <ConfigModal
                    open={isModalOpen}
                    closeModal={closeConfigModal}
                />
            )}
        </div>
    )
};

export default Racer;
