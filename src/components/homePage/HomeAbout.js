import React, { useState, useEffect } from 'react'
import { Container, Flex } from '../../styles/globalStyles'
import {HomeAboutSection, About, Services, AccordionHeader, AccordionIcon, AccordionContent} from '../../styles/HomeStyles'
import {motion, useAnimation} from 'framer-motion'
import {useInView} from 'react-intersection-observer'
import { useGlobalStateContext } from '../../context/globalContext'
 

const accordionIds = [
    {id: 0, title: 'Pre-production',
    results: [
    'Creative Development', 
    'Writing',
    'Storyboards',
    'Art Direction',
    'Creative Direction',
    'Location Scouting',
    'Casting']
}, 
{id: 1, title: 'Video-production',
    results: [
    'Creative Development', 
    'Writing',
    'Storyboards',
    'Art Direction',
    'Creative Direction',
    'Location Scouting',
    'Casting']
}, 
{id: 2, title: 'Post-production',
    results: [
    'Creative Development', 
    'Writing',
    'Storyboards',
    'Art Direction',
    'Creative Direction',
    'Location Scouting',
    'Casting']
}, 
{id: 3, title: 'Audio Post-production',
    results: [
    'Creative Development', 
    'Writing',
    'Storyboards',
    'Art Direction',
    'Creative Direction',
    'Location Scouting',
    'Casting']
}
]


const HomeAbout = ({onCursor}) => {
    const animation = useAnimation()
    const [aboutRef, inView] = useInView({
        // if you scroll back up it won't show the animation for the second time
        triggerOnce: true,
        // rootMargin: change the margin of the positioning, it affects only contentRef. Depends on the origin
        rootMargin: '-300px'
    })

    useEffect(()=>{
        //if we have reached the view, then we start a visible animation found in variant
        if (inView) {
            animation.start('visible')
        }
    }, [animation, inView])


    const [expanded, setExpanded] = useState(0)
    

    return (
        <HomeAboutSection 
            ref={aboutRef}
            animate={animation}
            initial="hidden"
            variants={{
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {duration: .6, ease: [.6, 0.05, -.01, .9]}
                },
                hidden: {
                    opacity: 0, y: 72,
                }
            }}>
            <Container>
                <Flex alignTop>
                    <About>
                        <h2>Enim ipsum aliquip do mollit ex deserunt veniam qui labore nisi laborum nulla.  </h2>
                        <p>Ipsum duis deserunt aliquip enim tempor amet velit consequat voluptate occaecat. Fugiat ut aliqua deserunt amet non aute.</p>
                    </About>
                    <Services>
                        <h3>Services</h3>
                        {accordionIds.map((details, index) => (
                            <Accordion 
                                key={index} 
                                details={details}
                                expanded={expanded}
                                setExpanded={setExpanded}
                                onCursor={onCursor}/>
                        ))}
                    </Services>
                </Flex>
            </Container>
        </HomeAboutSection>
    )
}

const Accordion = ({details, expanded, setExpanded, onCursor}) => {
    const isOpen = details.id === expanded;
    const [hovered, setHovered] = useState(false)
    const {currentTheme} = useGlobalStateContext()
    return (
        <>
            <AccordionHeader 
                onClick={()=>setExpanded(isOpen?false:details.id)}
                onMouseEnter={()=>()=>onCursor('hovered')}
                onMouseLeave={onCursor}
                onHoverStart={()=>setHovered(!hovered)}
                onHoverEnd={()=>setHovered(!hovered)}
                whileHover={{
                    color: currentTheme
                    === 'dark' ? "#ffffff" : "#000000"
                }}
            >
                <AccordionIcon>
                    <motion.span
                        animate={{rotate: isOpen || hovered ? 0 : 45, x: 3}}
                        transition={{duration: .2, ease: [.5, .05, -.01, .9]}}
                        ></motion.span>
                    <motion.span
                        animate={{rotate: isOpen || hovered ? 0 : -45, x: -3}}
                        transition={{duration: .2, ease: [.5, .05, -.01, .9]}}
                        ></motion.span>

                </AccordionIcon>
                {details.title}
            </AccordionHeader>
            <AccordionContent 
                key={expanded}
                animate={{height: isOpen? '100%' : '0'}}
                transition={{duration: .8, ease: [.5, .05, -.01, .9]}}
                >
               {details.results.map((result, index) => (
                   <span key={index}>{result}</span>
               ))}
            </AccordionContent>
        </>
    )
}


export default HomeAbout
