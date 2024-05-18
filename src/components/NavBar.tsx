import { useState } from 'react'
import { MenuButton, Text, Flex, useTheme } from '@aws-amplify/ui-react'
import './NavBar.css'
import { useNavigate } from 'react-router-dom';
import i18n from '../i18n';
import NavButton from './NavButton';

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
                    <MenuButton />
                </div>
                <div className={`nav-elements  ${showNavbar && 'active'}`}>
                    <ul>
                        <li>
                            <NavButton path='/product' labelKey={t("Product Nav button")} onClick={() => { navigate('/product'); setShowNavbar(false); }} /> </li>
                        <li>
                            <NavButton path='/circularity' labelKey={t("Circularity Nav button")} onClick={() => { navigate('/circularity'); setShowNavbar(false); }} />
                        </li>
                        <li>
                            <NavButton path='/contact' labelKey={t("Contact")} onClick={() => { navigate('/contact'); setShowNavbar(false); }} />
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