import React from 'react';
import { ITextViewerProps } from '../Racer.interfaces';
import '../Racer.css';

const TextViewer: React.FC<ITextViewerProps> = (props) => {
    const {
        characters,
        currentIndex,
        validations,
    } = props;

    return (
        <div className="text-viewer-container">
            {characters.map((char, index) => (
                <div
                    style={{
                        display: 'inline-block',    
                        whiteSpace: 'pre-wrap',
                        borderBottom: `5px solid ${currentIndex === index ? '#888' : 'transparent'}`,
                        marginBottom: '8px',
                        ...(validations?.[index] === 'invalid' && {backgroundColor: '#f7cbcb'}),
                        ...(validations?.[index] === 'valid' && {backgroundColor: '#a4ffa6'})
                    }}
                    key={index}
                >
                    <span>{char}</span>
                </div>
            ))}
        </div>
    )
};

export default TextViewer;