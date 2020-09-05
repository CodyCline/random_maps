import * as React from 'react';
import { ReactComponent as GithubIcon } from './github.svg';
import './layout.css';

export const Layout = ({ children }: any) => {
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
        <GithubIcon style={{height: "2em", width: "2em"}}/>
    </footer>
);