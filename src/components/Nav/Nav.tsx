import React from 'react';
import { REPO_LINK } from '../../constants/app.constants';
import GithubLogo from '../../assets/github.svg';

const Nav: React.FC = () => {
    return (
        <nav
            style={{
                width: '100%',
                height: '4rem',
                display: 'flex',
                alignItems: 'center',
                padding: '0 2rem',
                boxSizing: 'border-box',
            }}
        >
            <a
                style={{
                    textDecoration: 'none',
                    fontFamily: '"Courier Prime", monospace',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: 'white',
                }}
                href="/"
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}
                >
                    <img
                        src="/logo192.png"
                        width={24}
                        height={24}
                        alt="morse-racer"
                    />
                    <div
                        style={{
                            marginTop: '0.25rem',
                        }}
                    >
                        Morse Racer
                    </div>
                </div>
            </a>
            <div style={{flexGrow: 1}} />
            <a
                rel="noopener noreferrer"
                target='_blank'
                href={REPO_LINK}
            >
                <GithubLogo
                    width={32}
                    height={32}
                />
            </a>
        </nav>
    )
};

export default Nav;