import React, { useState, useRef, useCallback, useMemo } from 'react';
import { baseTime, keyboardBinding, slopPercentage, text } from '../../constants/app.constants';
import TextViewer from './components/TextViewer';
import { getMorseCodeFromTime } from '../../utils/app.utils';
import MorseDisplay from './components/MorseDisplay';
import { IMorseState } from './Racer.interfaces';
import ConfigModal from './components/ConfigModal';
import { MORSE_TO_CHAR_MAP } from '../../constants/ morse.constants';

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

    const setupAudio = useCallback(async () => {
        if (audioContext.current) {
            return;
        }

        audioContext.current = new AudioContext();
        if (audioContext.current?.state === 'suspended') {
            await audioContext.current?.resume();
        }
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

    const keyboardEventWrapper = useCallback((callback: VoidFunction) => {
        return (e: KeyboardEvent) => {
            if (e.code !== keyboardBinding) {
                return;
            }
            e.preventDefault();
            callback();
        }
    }, [keyboardBinding]);

    const pointerEventWrapper = useCallback((callback: VoidFunction) => {
        return (e: PointerEvent) => {
            e.preventDefault();
            callback();
        }
    }, [keyboardBinding]);

    const onMorseKeyDown = useCallback(() => {
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

    const onMorseKeyUp = useCallback(() => {
        const diffTime = new Date().getTime() - timestamp.current;
        const morseCode = getMorseCodeFromTime(diffTime, baseTime, slopPercentage);
        setMorseState((state) => ({...state, morseBuffer: state.morseBuffer + morseCode}));
        charCompleteTimeoutRef.current = setTimeout(charCompleteCallback, baseTime * 4);
        stopAudio();
    }, [stopAudio]);

    const keyUpHandler = useMemo(() => keyboardEventWrapper(onMorseKeyUp), [onMorseKeyUp, keyboardEventWrapper]);
    const keyDownHandler = useMemo(() => keyboardEventWrapper(onMorseKeyDown), [onMorseKeyDown, keyboardEventWrapper]);
    const pointerUpHandler = useMemo(() => pointerEventWrapper(onMorseKeyUp), [onMorseKeyUp, pointerEventWrapper]);
    const pointerDownHandler = useMemo(() => pointerEventWrapper(onMorseKeyDown), [onMorseKeyDown, pointerEventWrapper]);

    const openConfigModal = () => {
        document.body.removeEventListener('keyup', keyUpHandler);
        document.body.removeEventListener('keydown', keyDownHandler);
        document.body.removeEventListener('pointerup', pointerUpHandler);
        document.body.removeEventListener('pointerdown', pointerDownHandler);

        setModalOpen(true);
    };

    const closeConfigModal = useCallback(() => {
        setModalOpen(false);
        
        document.body.addEventListener('keyup', keyUpHandler);
        document.body.addEventListener('keydown', keyDownHandler);
        document.body.addEventListener('pointerup', pointerUpHandler);
        document.body.addEventListener('pointerdown', pointerDownHandler);

        setupAudio();
    }, [onMorseKeyDown, onMorseKeyUp, setupAudio]);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0 1rem',
                marginTop: '2rem',
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
            {isModalOpen ? (
                <ConfigModal
                    open={isModalOpen}
                    closeModal={closeConfigModal}
                />
            ) : (
                <div
                    style={{
                        marginTop: '2rem',
                        fontSize: '1.5rem',
                        color: 'white',
                        textAlign: 'center',
                    }}
                >
                    <span>
                        "[{keyboardBinding}]" or click/tap anywhere
                    </span>
                </div>
            )}
        </div>
    )
};

export default Racer;
