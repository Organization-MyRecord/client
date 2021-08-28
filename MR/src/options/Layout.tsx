import React from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
const Layout = (props : {
    children : React.ReactNode
}) => {


    return (
        <React.Fragment>
            <Topbar/>
            <Sidebar/>
            <main style = {{paddingTop : "90px"}}>
                {props.children}
            </main>
        </React.Fragment>
    )
}

export default Layout
