import React from 'react';
import { ITextViewerProps } from '../Racer.interfaces';

const TextViewer: React.FC<ITextViewerProps> = (props) => {
    const {
        characters,
        currentIndex,
        validations,
    } = props;

    return (
        <div
            style={{
                padding: '16px',
                border: '1px solid #000',
                width: '100%',
                boxSizing: 'border-box',
                textTransform: 'capitalize',
                fontFamily: '"Courier Prime", monospace',
            }}
        >
            {characters.map((char, index) => (
                <div
                    style={{
                        display: 'inline-block',    
                        whiteSpace: 'pre-wrap',
                        borderBottom: `5px solid ${currentIndex === index ? '#888' : 'transparent'}`,
                        marginBottom: '8px',
                        ...(validations?.[index] === 'invalid' && {backgroundColor: '#f7cbcb'}),
                        ...(validations?.[index] === 'valid' && {backgroundColor: '#c4ffc6'})
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