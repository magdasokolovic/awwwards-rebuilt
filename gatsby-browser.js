import React from 'react'
import {GlobalProvider} from './src/context/globalContext'

export const wrapRootElement = ({element}) => {
    // element is the whoole gasby app

    return (
        <GlobalProvider>
            {element}
        </GlobalProvider>
    )
}