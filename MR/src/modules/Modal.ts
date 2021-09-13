import { ActionType } from "./action-type";
import { ModalAction } from "./actions/index";

type ModaltState = {
  ModalState: boolean;
  ModalText: string;
};

const initialState: ModaltState = {
  ModalState: false,
  ModalText: "",
};

const Modal = (state: ModaltState = initialState, action: ModalAction) => {
  switch (action.type) {
    case ActionType.OPEN_MODAL:
      return {
        ...state,
        ModalState: true,
        ModalText: action.payload,
      };
    case ActionType.CLOSE_MODAL:
      return {
        ...state,
        ModalState: false,
      };
    default:
      return state;
  }
};

export default Modal;
