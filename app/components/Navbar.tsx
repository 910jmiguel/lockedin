import React from 'react';
import Link from 'next/link';

type NavbarProps = object

const Navbar: React.FC<NavbarProps> = () => (
    <nav
        className="rounded-xl"
        style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '1rem 2rem',
        padding: '0.5rem 2rem',
        background: '#222',
        color: '#fff'
    }}>
        <Link href="/" style={{ fontWeight: 'bold', fontSize: '1.3rem'}}
             className={"hover:bg-sky-700 hover:rounded-xl hover:delay-75 p-3"}>
            🔒 | LockedIn
        </Link>
        <div style={{ display: 'flex', gap: '1rem'}} className={"font-sans"}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/signup">Get Started</Link>
            <Link href="/login">Login</Link>
        </div>
    </nav>
);

export default Navbar;