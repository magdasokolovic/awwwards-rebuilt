import React, {useState, useEffect} from 'react'
import {Cursor} from '../styles/globalStyles'

//context
import {useGlobalStateContext} from '../context/globalContext'

const CustomCursor = ({toggleMenu}) => {
    const {cursorType} = useGlobalStateContext()
    const [mousePosition, setMousePosition] = useState({

        //initial mouse state when the mouse loads
        x: 400,
        y: 400
    })
    // mouse movement
    const onMouseMove = event => {
        // capture pages on the window
        const {pageX: x, pageY: y} = event;
        // update the initial state wherever the mouse is
        setMousePosition({x, y})
    }

    useEffect(() => {
        document.addEventListener('mousemove', onMouseMove)
        
        return () => {
            document.removeEventListener('mousemove', onMouseMove)
        }
    }, []) // empty array - runs only once when component loads

    return (
        <>
            <Cursor 
                className={`${!!cursorType ? 'hovered' : ''} ${cursorType} ${toggleMenu?'nav-open' : ''}`}
                style={{left: `${mousePosition.x}px`, top: `${mousePosition.y}px`}}
            />
        </>
    )
}

export default CustomCursor
