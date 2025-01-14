import React, { useState } from 'react';
import styles from "./Footer.module.css";
import facebook from "../../Images/icons/facebook.png";
import twitter from "../../Images/icons/twitter.png";
import instagram from "../../Images/icons/instagram.png"; 

function Footer() {

    return (
    
        <footer className={styles.footer}>
        <div className={styles.footerContent}>
            <div className={styles.section}>
                <h4>Suporte</h4>
                <ul>
                    <li><a href="#">Atendimento ao cliente</a></li>
                    <li><a href="#">Garantia</a></li>
                    <li><a href="#">Reparos</a></li>
                    <li><a href="#">Contato</a></li>
                </ul>
            </div>

            <div className={styles.section}>
                <h4>Sobre nós</h4>
                <ul>
                    <li><a href="#">Nossa história</a></li>
                    <li><a href="#">Carreiras</a></li>
                    <li><a href="#">Termos de Uso</a></li>
                    <li><a href="#">Política de Privacidade</a></li>
                </ul>
            </div>

            <div className={styles.section}>
                <h4>Conecte-se conosco</h4>
                <div className={styles.socialIcons}>
                    <a href="#"><img src={facebook}/></a>
                    <a href="#"><img src={twitter}/></a>
                    <a href="#"><img src={instagram}/></a>
                </div>
            </div>
        </div>

        <div className={styles.copyright}>
            <p>&copy; 2024 E-commerce. Todos os direitos reservados.</p>
        </div>
    </footer>
);
}

export default Footer;
