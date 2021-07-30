import React from "react"
import Layout from "../components/layout"
//components: 
import HomeBanner from "../components/homePage/HomeBanner"
import HomeContent from "../components/homePage/HomeContent"
import HomeFeature from "../components/homePage/HomeFeature"
import HomeAbout from "../components/homePage/HomeAbout"

// context: 
import {useGlobalStateContext, useGlobalDispatchContext} from '../context/globalContext'

const IndexPage = props => {
  const {cursorStyles} = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()

  const onCursor = cursorType => {
    cursorType = (cursorStyles.includes(cursorType) && cursorType) || false
    dispatch({type: 'CURSOR_TYPE', cursorType: cursorType})
  }


  return (
    <Layout>
      <HomeBanner onCursor={onCursor} />
      <HomeContent />
      <HomeFeature onCursor={onCursor} />
      <HomeAbout />
    </Layout>
  )
}

export default IndexPage
