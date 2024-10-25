import React, { useState, useRef, useCallback } from 'react';
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
    const audioContext = useRef<AudioContext | null>(null);
    const audioGain = useRef<GainNode | null>(null);

    const setupAudio = useCallback(() => {
        if (audioContext.current) {
            return;
        }

        audioContext.current = new AudioContext();
        const oscillator = audioContext.current?.createOscillator();
        oscillator.type = 'sine';
        audioGain.current = audioContext.current?.createGain();
        oscillator.connect(audioGain.current);
        audioGain.current?.connect(audioContext.current?.destination);

        audioGain.current.gain.value = 0.000001;

        oscillator.start(0);
    }, []);

    const startAudio = useCallback(() => {
        if (!audioContext.current) {
            return;
        }

        audioGain.current?.gain?.exponentialRampToValueAtTime(
            0.95, audioContext.current?.currentTime + 0.05
        );
    }, []);

    const stopAudio = useCallback(() => {
        if (!audioContext.current) {
            return;
        }

        audioGain.current?.gain?.exponentialRampToValueAtTime(
            0.000001, audioContext.current?.currentTime + 0.05
        );
    }, []);

    const onMorseKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.code !== keyboardBinding) {
            return;
        }
        if(charCompleteTimeoutRef.current) {
            clearTimeout(charCompleteTimeoutRef.current);
        }
        timestamp.current = new Date().getTime();
        startAudio();
    }, [startAudio]);

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
        stopAudio();
    }, [stopAudio]);

    const openConfigModal = () => {
        document.body.removeEventListener('keyup', onMorseKeyUp as unknown as EventListener);
        document.body.removeEventListener('keydown', onMorseKeyDown as unknown as EventListener);

        setModalOpen(true);
    };

    const closeConfigModal = useCallback(() => {
        setModalOpen(false);
        
        document.body.addEventListener('keyup', onMorseKeyUp as unknown as EventListener);
        document.body.addEventListener('keydown', onMorseKeyDown as unknown as EventListener);
        setupAudio();
    }, [onMorseKeyDown, onMorseKeyUp, setupAudio]);

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
