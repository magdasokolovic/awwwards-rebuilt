import React, {useState} from "react"
import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"
//component: React
import Header from './header'
import Cursor from './customCursor'
import Navigation from '../components/Navigation'
import Footer from "./footer"

//context:
import {useGlobalStateContext, useGlobalDispatchContext} from '../context/globalContext'

// styled components, global variables
import {createGlobalStyle, ThemeProvider} from "styled-components"
import {normalize} from 'styled-normalize'
import './font.css'

const GlobalStyle = createGlobalStyle`
  ${normalize}
  * {
    text-decoration: none;
    cursor: none; 
  }
  html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
  }

   body {
    font-family: 'Montserrat', sans-serif;
    background-color: ${props => props.theme.background};
    overscroll-behavior: none;
    overflow-x: hidden;
   }
`


const Layout = ({ children }) => {
  // // const data = useStaticQuery(graphql`
  // //   query SiteTitleQuery {
  // //     site {
  // //       siteMetadata {
  // //         title
  // //       }
  // //     }
  // //   }
  // // `)

  const [hamburgerPosition, setHamburgerPosition] = useState({
    x: 0, y: 0
  })

  const darkTheme = {
    background: 'black',
    text: 'white',
    red: '#ea291e',
    left: `${hamburgerPosition.x}px`, 
    top: `${hamburgerPosition.y}px`,
  }


  const lightTheme = {
    background: 'white',
    text: 'black',
    red: '#ea291e',
    left: `${hamburgerPosition.x}px`, 
    top: `${hamburgerPosition.y}px`,
  }

  const {currentTheme, cursorStyles} = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()

  const onCursor = cursorType => {
    cursorType = (cursorStyles.includes(cursorType) && cursorType) || false
    dispatch({type: 'CURSOR_TYPE', cursorType: cursorType})
  }
  const [toggleMenu, setToggleMenu] = useState(false)

  return (
    <ThemeProvider theme={currentTheme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle/>
      <Cursor toggleMenu={toggleMenu}/>
      <Header
        hamburgerPosition = {hamburgerPosition}
        setHamburgerPosition = {setHamburgerPosition}
        onCursor={onCursor} 
        toggleMenu={toggleMenu} 
        setToggleMenu={setToggleMenu}/>
      <Navigation 
        toggleMenu={toggleMenu} 
        setToggleMenu={setToggleMenu}
        onCursor={onCursor}
        />
      <main>{children}</main>
      <Footer onCursor={onCursor}/>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
