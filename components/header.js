import Image from 'next/image';
import Link from 'next/link';

import logo from '../public/logo.png'
import styles from '../styles/Header.module.css'

const NAVIGATION = {
    "MC Server": "/minecraft",
    "Store": "https://store.bridgescrims.net",
	Montages: "/montages",
	Tournaments: "/tournaments",
	About: "/about",
}

export default function Header() {
    
    function openNavigation() {
        document.getElementById(styles.PageNavigation).style.setProperty('display', 'flex')
    }

    function closeNavigation() {
        document.getElementById(styles.PageNavigation).style.setProperty('display', null)
    }

    return (
        <header id={styles.Header}>
            <Link onClick={closeNavigation} id={styles.HomeButton} href="/">
                <Image className={styles.logo} src={logo} alt="Logo" height="55"/>
                <h2><span className={styles.top}>bridge</span><br/><span className={styles.bottom}>scrims</span></h2>
            </Link>
            <button onClick={openNavigation} id={styles.NavButton}><i className='bi bi-list'></i></button>
            <ul id={styles.PageNavigation}>
                {<li><button onClick={closeNavigation}><i id={styles.NavClose} className='bi bi-arrow-right-circle-fill'></i></button></li>}
                {Object.entries(NAVIGATION).map(([name, href]) => (
                <li key={name}>
                    <Link onClick={closeNavigation} href={href}>{name}</Link>
                </li>
                ))}
            </ul>
        </header>
    )
}