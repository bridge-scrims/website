import Image from 'next/image';
import Link from 'next/link';

import logo from '../public/logo.png'
import styles from '../styles/Header.module.css'

const NAVIGATION = {
	Montages: "/montages",
	Tournaments: "/tournaments",
	Packs: "/packs",
}

export default function Header() {
    return (
        <header id={styles.Header}>
            <Link id={styles.HomeButton} href="/">
                <Image className={styles.logo} src={logo} alt="Logo" height="50"/>
                <h2><span className={styles.top}>bridge</span><br/><span className={styles.bottom}>scrims</span></h2>
            </Link>
            <ul id={styles.PageNavigation}>
                {Object.entries(NAVIGATION).map(([name, href]) => (
                <li key={name}>
                    <Link href={href}>{name}</Link>
                </li>
                ))}
            </ul>
        </header>
    )
}