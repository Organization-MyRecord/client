//게시글 관련 액션 함수 지정

import { ActionType } from "../action-type";
import { PostAction } from "../actions/index";
import { Dispatch } from "redux";
import axios from "axios";
import { OpenModalHandler } from "./ModalIndex";

//메인페이지 게시글 가져오기
export const GetPostHandler = (setLoading: any, dispa: any) => {
  return async (dispatch: Dispatch<PostAction>) => {
    if (sessionStorage.getItem("token") == null) {
      await axios.get("/api/main").then((res) => {
        if (res.data.result) {
          dispatch({
            type: ActionType.POST_INFO,
            payload: res.data.value,
          });
          setLoading(false);
        } else {
          dispa(OpenModalHandler(res.data.description));
          setLoading(false);
        }
      });
    } else {
      await axios
        .get("/api/main", {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
        })
        .then((res) => {
          if (res.data.result) {
            dispatch({
              type: ActionType.POST_INFO,
              payload: res.data.value,
            });
            setLoading(false);
          } else {
            dispa(OpenModalHandler(res.data.description));
            setLoading(false);
          }
        });
    }
  };
};

//게시글 등록
export const PostRegistHandler = (
  postName: string,
  content: string,
  diretoryName: string,
  postImage: any,
  history: any,
  dispa: any,
) => {
  return async (dispatch: Dispatch<PostAction>) => {
    await axios
      .post(
        "/api/create_post",
        {
          postName: postName,
          content: content,
          directoryName: diretoryName,
          postImage: postImage,
        },
        {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
        },
      )
      .then((res) => {
        if (res.data.result) {
          dispatch({
            type: ActionType.POST_REGISTRATION,
            payload: res.data.value,
          });

          dispa(OpenModalHandler("게시글이 정상적으로 등록되었습니다."));
          history.push(`/post/${res.data.value.postUserEmail}/${res.data.value.id}`);
        }
      });
  };
};

//게시글 삭제
export const DeletePostHandler = (postId: number, hitsory: any, dispa) => {
  return async (dispatch: Dispatch<PostAction>) => {
    await axios
      .delete(`/api/post_delete/${postId}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then((res) => {
        dispatch({
          type: ActionType.POST_DELETE,
        });
        if (res.data.result) {
          dispa(OpenModalHandler("게시글이 정상적으로 삭제 되었습니다."));
        }
      })
      .then(() => hitsory.push("/mypage"));
  };
};

//게시글 세부
export const GetPostingHandler = (postId) => {
  return async (dispatch: Dispatch<PostAction>) => {
    await axios.get(`/api/post/${postId}`).then((res) => {
      dispatch({
        type: ActionType.POST_GET,
        payload: res.data,
      });
    });
  };
};

//분야별 조회
export const GetFieldPostHandler = (field: string, dispa: any, setloading: (bool: boolean) => void) => {
  return async (dispatch: Dispatch<PostAction>) => {
    await axios
      .get(`/api/post?field=${field}`)
      .then((res) => {
        if (res.data.result) {
          dispatch({
            type: ActionType.POST_GET_FIELD,
            payload: res.data.value,
          });
        } else {
          dispa(OpenModalHandler(res.data.description));
        }
      })
      .then(() => setloading(false));
  };
};

//게시물 검색
export const GetSearchHandler = (keyword: string, page: number, dispa: any, setloading: (bool: boolean) => void) => {
  return async (dispatch: Dispatch<PostAction>) => {
    await axios
      .get(`/api/search?keyword=${keyword}`)
      .then((res) => {
        console.log(res);

        if (res.data.result) {
          dispatch({
            type: ActionType.POST_SEARCH,
            payload: res.data.value,
          });
        } else {
          dispa(OpenModalHandler(res.data.description));
        }
      })
      .then(() => setloading(false));
  };
};

//디렉토리 데이터 가져오기
export const GetDirectoryData = (
  directoryName: string,
  email: string,
  setloading: (bool: boolean) => void,
  dispa: any,
) => {
  console.log(directoryName, email);

  return async (dispatch: Dispatch<PostAction>) => {
    await axios
      .get(`/api/directory?directoryName=${directoryName}&userEmail=${email}`)
      .then((res) => {
        console.log(res);

        if (res.data.result) {
          dispatch({
            type: ActionType.GET_DIRECTORY_DATA,
            payload: res.data.value,
          });
        } else {
          dispa(OpenModalHandler(res.data.description));
        }
      })
      .then(() => setloading(false));
  };
};

//게시글 수정
export const PostUpdateHandelr = (
  content: string,
  newPostName: string,
  postId: number,
  history: any,
  dispa,
  directoryName,
) => {
  return async (dispatch: Dispatch<PostAction>) => {
    await axios
      .put(
        "/api/update_post",
        {
          content: content,
          newPostName: newPostName,
          postId: postId,
          directoryName: directoryName,
        },
        {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
        },
      )
      .then((res) => {
        if (res.data.result) {
          dispatch({
            type: ActionType.POST_UPDATE,
            payload: res.data.value,
          });
          dispa(OpenModalHandler("게시글이 정상적으로 수정되었습니다!"));

          history.push("/mypage");
        } else {
          dispa(OpenModalHandler(res.data.description));
        }
      });
  };
};
