import * as React from 'react';
import * as types from '../../types/components';
import { Tooltip } from 'react-tippy';
import { ReactComponent as GithubIcon } from './github.svg';
import './layout.css';


export const Layout = ({ children }: types.PureComponent) => {
    return (
        <main>
            <Navigation />
            {children}
            <Footer />
        </main>
    )

}

const Navigation = () => (
    <nav className="nav">
        <h1 className="nav__header">Random Maps</h1>
    </nav>
)

const Footer = () => (
    <footer className="footer">
        <Tooltip title="View source" trigger="mouseenter" position="top">
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/codycline/random_maps">
                <GithubIcon style={{height: "1.5em", width: "1.5em"}}/>
            </a>
        </Tooltip>
        <Tooltip title="Author website" trigger="mouseenter" position="top">
            <a target="_blank" rel="noopener noreferrer" href="https://codycline.com">
                cody cline
            </a>
        </Tooltip>
    </footer>
);