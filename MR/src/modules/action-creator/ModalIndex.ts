import { ActionType } from "../action-type";
import { ModalAction } from "../actions/index";
import { Dispatch } from "redux";

export const OpenModalHandler = (modalText: string) => {
  return (dispatch: Dispatch<ModalAction>) => {
    dispatch({
      type: ActionType.OPEN_MODAL,
      payload: modalText,
    });
  };
};

export const CloseModalHandler = () => {
  return (dispatch: Dispatch<ModalAction>) => {
    dispatch({
      type: ActionType.CLOSE_MODAL,
    });
  };
};

export const ConfirmModalHandler = (modalText: string, func: any) => {
  return (dispatch: Dispatch<ModalAction>) => {
    dispatch({
      type: ActionType.OPEN_CONFIRM_MODAL,
      payload: modalText,
      func: func,
    });
  };
};
