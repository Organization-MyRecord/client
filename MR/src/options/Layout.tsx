import React from 'react'
import Topbar from './Topbar'
import '../styles/layout.scss'
const Layout = (props : {
    children : React.ReactNode
}) => {


    return (
        <div className = "layout">
            <header>
                <Topbar/>
            </header>
            <aside></aside>
            <section>
                {props.children}
            </section>
            <footer></footer>
        </div>
    )
}

export default Layout
