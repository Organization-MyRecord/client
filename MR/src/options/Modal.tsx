import { useSelector } from "react-redux";
import { RootState } from "../modules/Store";
import "../styles/Modal.scss";

interface IProps {
  open: boolean;
  confirm?: boolean;
  close: any;
  header: string;
}

function Modal(props: IProps) {
  const state = useSelector((state: RootState) => state.Modal.ConfirmState);
  const reduxFunction = useSelector((state: RootState) => state.Modal.func);
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
            <button
              className="close"
              style={state ? { marginRight: "10px" } : { display: "none" }}
              onClick={reduxFunction}
            >
              확인
            </button>
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
