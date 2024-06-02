import { useState } from 'react'
import { Text, Flex, useTheme } from '@aws-amplify/ui-react'
import './NavBar.css'
import { useNavigate } from 'react-router-dom';
import i18n from '../i18n';
import NavButton from './NavButton';

import duck from "./../assets/duck-svgrepo-com.svg";

import { useTranslation } from 'react-i18next'

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false)

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar)
    }

    const { tokens } = useTheme();

    const chooseLanguage = (e: string) => {
        i18n.changeLanguage(e);   // i18n.changeLanguage() is used to change the language assigned to lng in i18n.js file.
    }

    const { t } = useTranslation();

    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="container">
                <div className="menu-icon" onClick={handleShowNavbar}>
                    <img src={duck} height="100px"/>
                </div>
                <div className={`nav-elements  ${showNavbar && 'active'}`}>
                    <ul>
                        <li>
                            <NavButton path='/' labelKey={t("Home Nav button")} onClick={() => { navigate('/'); setShowNavbar(false); }} /> </li>
                        <li>
                            <NavButton path='/upload' labelKey={t("Upload Nav button")} onClick={() => { navigate('/upload'); setShowNavbar(false); }} />
                        </li>
                         <li>
                            <NavButton path='/transcribe' labelKey={t("Transcribe Nav button")} onClick={() => { navigate('/transcribe'); setShowNavbar(false); }} />
                        </li>
                        <li>
                        <Flex
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                display="flex"
                            >
                                <NavButton path='' labelKey="FR" onClick={() => chooseLanguage("fr")} />
                                <Text color={tokens.colors.brand}>|</Text>
                                <NavButton path=''  labelKey="DE" onClick={() => chooseLanguage("de")} />
                                </Flex>
                        </li>
                    </ul>
                </div >
            </div >
        </nav >
    )
}

export default Navbar