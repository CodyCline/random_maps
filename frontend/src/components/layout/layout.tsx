import * as React from 'react';
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

    </footer>
);