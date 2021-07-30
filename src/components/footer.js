import React from 'react'
import { Container, Flex } from '../styles/globalStyles'
import {FooterNav, FooterSocial, FooterContent} from '../styles/footerStyles'

import {Instagram, Facebook, Vimeo} from '../assets/svg/social-icons'

const Footer = ({onCursor}) => {
    return (
        <FooterNav>
            <Container>
                <Flex spaceBetween>
                    <FooterContent>
                        <p>015204248662</p>
                        <p>magda.sokolovic@gmail.com</p>
                    </FooterContent>

                    <FooterContent wider>
                        <p>Rhinstasse 88</p>
                        <p>10315 Berlin, Germany</p>
                    </FooterContent>

                    <FooterSocial>
                     <a
                        onMouseEnter={()=>onCursor('hovered')}
                        onMouseLeave={onCursor}
                        href="/">
                         <Instagram/>
                     </a>
                     <a
                        onMouseEnter={()=>onCursor('hovered')}
                        onMouseLeave={onCursor}
                        href="/">
                         <Facebook/>
                     </a>
                     <a
                        onMouseEnter={()=>onCursor('hovered')}
                        onMouseLeave={onCursor}
                        href="/">
                         <Vimeo/>
                     </a>
                    </FooterSocial>
                </Flex>
            </Container>
        </FooterNav>
    )
}

export default Footer
