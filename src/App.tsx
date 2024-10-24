import React, { useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const audioContext = useRef<AudioContext | null>(null);
  const audioGain = useRef<GainNode | null>(null);

  const setupAudio = () => {
    audioContext.current = new AudioContext();
    const oscillator = audioContext.current?.createOscillator();
    oscillator.type = 'sine';
    audioGain.current = audioContext.current?.createGain();
    oscillator.connect(audioGain.current);
    audioGain.current?.connect(audioContext.current?.destination);
    oscillator.start(0);
    stop();
  };

  const start = () => {
    console.log('start');
    // if (!audioContext.current) setupAudio();
    if (!audioContext.current) return;
    if (!audioGain.current) return;

    audioGain.current?.gain?.exponentialRampToValueAtTime(
      0.95, audioContext.current?.currentTime + 0.05
    );
  };

  const stop = () => {
    // if (!audioContext.current) setupAudio();
    if (!audioContext.current) return;
    if (!audioGain.current) return;

    audioGain.current?.gain?.exponentialRampToValueAtTime(
      0.000001, audioContext.current?.currentTime + 0.05
    );
  };

  useEffect(() => {
    return () => {
      stop();
      // oscillator.stop(0);
      // oscillator.disconnect();
      audioContext.current?.close();
    }
  }, []);

  return (
    <div className="App" onKeyDown={start} onKeyUp={stop}>
      <div tabIndex={0} autoFocus onClick={setupAudio}>Start</div> 
    </div>
  );
}

export default App;
