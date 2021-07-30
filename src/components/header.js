import React, {useEffect, useRef} from 'react'
import { Link } from 'gatsby'

//styled components:
import {HeaderNav, Logo, Menu} from '../styles/headerStyles'
import {Container, Flex} from '../styles/globalStyles'
//Context:
import {useGlobalStateContext, useGlobalDispatchContext} from '../context/globalContext'
//custom hook:

// import useElementPosition from '../hooks/useElementPosition'
// , setHamburgerPosition, hamburgerPosition = props

const Header = ({onCursor, toggleMenu, setToggleMenu}) => {
    const dispatch = useGlobalDispatchContext()
    const {currentTheme} = useGlobalStateContext()
    // const position = useElementPosition(hamburger)
    const hamburger = useRef(null)

    const toggleTheme = () => {
        if (currentTheme === 'dark') {
            dispatch({
                type: "TOGGLE_THEME", 
                theme: "light"
            })
        } else {
            dispatch({
                type: "TOGGLE_THEME", 
                theme: "dark"
            })
        }
    }
    // const menuHover = () => {
    //     onCursor('locked')
    //     setHamburgerPosition({
    //         x: position.x, 
    //         y: position.y + 72})
    //         //because of initial animation on y: -72
    // }
 ///save the previous theme after refreshing the page: 
    useEffect(() => {
        window.localStorage.setItem('theme', currentTheme)
    }, [currentTheme])

    return (
        <HeaderNav
            initial={{y: -72, opacity: 0,}}
            animate={{y: 0, opacity: 1,}}
            transition={{duration: 1, ease: [.6, .05, -.01, .9]}}>
           <Container>
               <Flex spaceBetween noHeight>
                   <Logo
                        onMouseEnter={()=>onCursor('hovered')}
                        onMouseLeave={onCursor}>
                       <Link to="/">MAGD</Link>
                       <span 
                            onClick={toggleTheme}
                            onMouseEnter={()=>onCursor('pointer')}
                            onMouseLeave={onCursor}
                       ></span>
                       <Link to="/">A</Link>
                   </Logo>
                   <Menu   
                        ref={hamburger}
                        // onMouseEnter={menuHover}
                        onMouseLeave={onCursor}
                        onClick={()=>setToggleMenu(!toggleMenu)}
                    >
                       <button>
                           <span></span>
                           <span></span>
                       </button>
                   </Menu>
               </Flex>
           </Container>

        </HeaderNav>
    )
}

export default Header


