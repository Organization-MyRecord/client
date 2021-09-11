import { ActionType } from "./action-type";
import { PostAction } from "./actions/index";

type PostState = {
  MyData: any; //나의 게시물
  FieldData: any; //분야별 게시물
  PostData: any; //게시물 데이터
  TotalData: any; //메인페이지 전체 데이터
  LoadingData: boolean;
  modalText: string; //모달 텍스트
};

const initialState: PostState = {
  MyData: null,
  TotalData: null,
  LoadingData: false,
  modalText: "",
  PostData: null,
  FieldData: null,
};

const Post = (state: PostState = initialState, action: PostAction) => {
  switch (action.type) {
    case ActionType.POST_INFO:
      return {
        ...state,
        TotalData: action.payload,
      };
    case ActionType.POST_REGISTRATION:
      return {
        ...state,
      };
    case ActionType.POST_DELETE:
      return {
        ...state,
      };
    case ActionType.POST_GET:
      return {
        ...state,
        PostData: action.payload,
      };
    case ActionType.POST_GET_FIELD:
      return {
        ...state,
        FieldData: action.payload,
      };
    case ActionType.POST_UPDATE:
      return {
        ...state,
        modalText: action.payload,
      };
    default:
      return state;
  }
};

export default Post;
