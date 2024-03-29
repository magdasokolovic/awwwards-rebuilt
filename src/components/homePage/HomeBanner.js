import React, {useEffect, useRef} from 'react'
import {Banner, Video, Canvas, BannerTitle, Headline} from '../../styles/HomeStyles'
//custom hooks
import useWindowSize from "../../hooks/useWindowSize"
//context hooks
import {useGlobalStateContext} from '../../context/globalContext'

const HomeBanner = ({onCursor}) => {
    let canvas = useRef(null)
    const size = useWindowSize()
    const {currentTheme} = useGlobalStateContext()

    useEffect(() => {
        let renderingElement = canvas.current
        // making a copy of canvas element so we can copy it:
        let drawingElement = renderingElement.cloneNode()

        let drawingCtx = drawingElement.getContext('2d')
        let renderingCtx = renderingElement.getContext('2d')

        let lastX;
        let lastY;
        // cursor is initially not moving:
        let moving = false;

        // 'source-over' = Displays the source image over the destination image
        renderingCtx.globalCompositeOperation = 'source-over'
        renderingCtx.fillStyle= currentTheme === 'dark' ? '#000000' : '#ffffff'
        //creating a rectangle: 
        renderingCtx.fillRect(0, 0, size.width, size.height)


        renderingElement.addEventListener('mouseover', e =>  {
            moving = true;
            lastX = e.pageX - renderingElement.offsetLeft;
            lastY = e.pageY - renderingElement.offsetTop;

        })

        renderingElement.addEventListener('mouseup', e =>  {
            moving = false;
            lastX = e.pageX - renderingElement.offsetLeft;
            lastY = e.pageY - renderingElement.offsetTop;
        })

        //creating eraser effect:
        renderingElement.addEventListener('mousemove', e =>  {
            if (moving) {
                //to make this eraser effect:
                drawingCtx.globalCompositeOperation = 'source-over'
                renderingCtx.globalCompositeOperation = 'destination-out'

                let currentX = e.pageX - renderingElement.offsetLeft;
                let currentY = e.pageY - renderingElement.offsetTop;

                drawingCtx.lineJoin = 'round'
                drawingCtx.moveTo(lastX, lastY)
                drawingCtx.lineTo(currentX, currentY)
                drawingCtx.closePath()
                drawingCtx.lineWidth = 120
                drawingCtx.stroke()
                lastX = currentX;
                lastY = currentY;
                renderingCtx.drawImage(drawingElement, 0, 0)
            }
        })
    }, [currentTheme])

    const parent = {
        initial: {y: 800},
        animate: {y: 0, 
            transition: {
            staggerChildren: .2
            }
        }
    }

    const child = {
        initial: {y: 800},
        animate: {y: 0, 
            transition: {
            duration: 1,
            ease: [.6, 0.05, -0.01, 0.9]
            }
        }
    }
    return (
        <Banner>
            <Video>
                <video
                    height="100%"
                    width="100%"
                    loop
                    autoPlay
                    src={require('../../assets/video/video.mp4')}
                    />
            </Video>

            <Canvas height={size.height}
                    width={size.width}
                    ref={canvas}
                    onMouseEnter={()=>onCursor('hovered')}
                    onMouseLeave={onCursor}/>

            <BannerTitle variants={parent} initial="initial" animate="animate">
                <Headline variants={child}>DIG</Headline>
                <Headline variants={child}>Deep</Headline>
            </BannerTitle>
        </Banner>
    )
}

export default HomeBanner
