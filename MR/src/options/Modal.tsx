import React from 'react'
import '../styles/Modal.scss'

interface IProps {
    open : boolean,
    confirm? : boolean,
    close : any,
    header : string,
    children? : React.ReactNode
}

function Modal(props : IProps) {

    const {open, close, header} = props

    return (
         // 모달이 열릴때 openModal 클래스가 생성된다.
         <div className={ open ? 'openModal modal' : 'modal' }>
         { open ? (  
             <section className = "modal_section">
                 <header>
                     {header}
                     <button className="close" onClick={() => close()}> &times; </button>
                 </header>
                 <main>
                     {props.children}
                 </main>
                 <footer>
                     <button className="close" onClick={() => close()}> close </button>
                 </footer>
             </section>
         ) : null }
     </div>
    )
}

export default Modal
