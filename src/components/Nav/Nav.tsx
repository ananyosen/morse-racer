import React from 'react';
import { REPO_LINK } from '../../constants/app.constants';
import GithubLogo from '../../assets/github.svg';

const Nav: React.FC = () => {
    return (
        <nav
            style={{
                width: '100%',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 32px',
                boxSizing: 'border-box',
            }}
        >
            <a
                style={{
                    textDecoration: 'none',
                    fontFamily: '"Courier Prime", monospace',
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: 'white',
                }}
                href="/"
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
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
                            marginTop: '4px',
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