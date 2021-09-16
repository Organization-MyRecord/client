import React from "react";
import "../styles/Modal.scss";

interface IProps {
  open: boolean;
  confirm?: boolean;
  close: any;
  header: string;
}

function Modal(props: IProps) {
  const { open, close, header } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section className="modal_section">
          <header>
            <h5>알림창</h5>
            <button className="close" onClick={() => close()}>
              &times;
            </button>
          </header>
          <main>{header}</main>
          <footer>
            <button className="close" onClick={() => close()}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
}

export default Modal;
