import React, {useEffect} from 'react'
import { Container } from '../../styles/globalStyles'
import {HomeContentSection, Content} from '../../styles/HomeStyles'

//Scroll bvehaviour:
import {useInView} from 'react-intersection-observer'
import {useAnimation} from 'framer-motion'

const HomeContent = () => {
    const animation = useAnimation()
    const [contentRef, inView] = useInView({
        // if you scroll back up it won't show the animation for the second time
        triggerOnce: true,
        // rootMargin: change the margin of the positioning, it affects only contentRef. Depends on the origin
        rootMargin: '-300px'
    })

    useEffect(()=>{
        if (inView) {
            animation.start('visible')
        }
    }, [animation, inView])
    return (
        <HomeContentSection
            ref={contentRef}
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
            }}
            >
            <Container>
                <Content>
                    Consectetur reprehenderit non Lorem incididunt fugiat est ad do nulla minim ea laborum labore. <br/> exercitation exercitation cillum reprehenderit culpa. Ut cupidatat adipisicing adipisicing fugiat minim ut amet
                </Content>
            </Container>
        </HomeContentSection>
    )
}

export default HomeContent
