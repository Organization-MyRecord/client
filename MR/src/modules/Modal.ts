import { ActionType } from "./action-type";
import { ModalAction } from "./actions/index";

type ModaltState = {
  ModalState: boolean;
  ModalText: string;
  ConfirmState: boolean;
  func: any;
};

const initialState: ModaltState = {
  ModalState: false,
  ModalText: "",
  ConfirmState: false,
  func: null,
};

const Modal = (state: ModaltState = initialState, action: ModalAction) => {
  switch (action.type) {
    case ActionType.OPEN_MODAL:
      return {
        ...state,
        ModalState: true,
        ConfirmState: false,
        ModalText: action.payload,
      };
    case ActionType.CLOSE_MODAL:
      return {
        ...state,
        ModalState: false,
      };
    case ActionType.OPEN_CONFIRM_MODAL:
      return {
        ...state,
        ModalState: true,
        ModalText: action.payload,
        func: action.func,
        ConfirmState: true,
      };
    default:
      return state;
  }
};

export default Modal;
