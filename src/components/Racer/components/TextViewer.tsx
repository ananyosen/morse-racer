import React from 'react';
import { ITextViewerProps } from '../Racer.interfaces';
import styled from 'styled-components';

const TextViewerContainer = styled.div`
    padding: 1rem;
    width: 100%;
    box-sizing: border-box;
    text-transform: capitalize;
    font-family: "Courier Prime", monospace;
    font-size: 2rem;
    background: #C5CAE9;

    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
`;

const TextViewer: React.FC<ITextViewerProps> = (props) => {
    const {
        characters,
        currentIndex,
        validations,
    } = props;

    return (
        <TextViewerContainer>
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
        </TextViewerContainer>
    )
};

export default TextViewer;