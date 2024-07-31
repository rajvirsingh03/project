import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
        <div style={styles.navbarContainer}>
            <div style={styles.logo}>
            <Link to="/" style={styles.navbarLink}>
                InsureChain
            </Link>
            </div>
            <ul style={styles.navItems}>
            <li style={styles.navItem}>
                <Link to="/" style={styles.navLink}>Home</Link>
            </li>
            <li style={styles.navItem}>
                <Link to="/register" style={styles.navLink}>Register</Link>
            </li>
            <li style={styles.navItem}>
                <Link to="/claim" style={styles.navLink}>Claim</Link>
            </li>
            <li style={styles.navItem}>
                <Link to="/investor" style={styles.navLink}>Investor</Link>
            </li>
            </ul>
        </div>
        </nav>
    );
};

const styles = {
    navbar: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black with opacity
        padding: '10px', // General padding around the navbar
        display: 'flex',
        justifyContent: 'center',
        width: 'calc(100% - 50px)', // Adjust width to account for side margins
        margin: '10px 20px', // Margin on top, left, and right
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        backdropFilter: 'blur(10px)', // Blur effect for see-through
        border: '0.5px solid rgba(255, 255, 255, 0.5)', // Light outline stroke
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.6)', // Darker drop shadow for depth
        borderRadius: '10px', // Rounded corners
    },
    navbarContainer: {
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#fff',
    },
    navbarLink: {
        textDecoration: 'none',
        color: '#fff',
    },
    navItems: {
        listStyle: 'none',
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        padding: 0,
    },
    navItem: {
        marginLeft: '20px',   
    },
    navLink: {
        textDecoration: 'none',
        color: '#fff',
        fontSize: '1rem',
        transition: 'color 0.3s',
    },
    navLinkHover: {
        color: '#ff7e5f',
    }
};

export default Navbar;
