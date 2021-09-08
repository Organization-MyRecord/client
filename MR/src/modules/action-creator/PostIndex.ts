//게시글 관련 액션 함수 지정

import { ActionType } from "../action-type";
import { PostAction } from "../actions/index";
import { Dispatch } from "redux";
import axios from "axios";

export const GetPostHandler = (setLoading: any) => {
  return async (dispatch: Dispatch<PostAction>) => {
    if (localStorage.getItem("token") == null) {
      await axios.get("/api/main").then((res) => {
        dispatch({
          type: ActionType.POST_INFO,
          payload: res.data,
        });
        setLoading(false);
      });
    } else {
      await axios
        .get("/api/main", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          dispatch({
            type: ActionType.POST_INFO,
            payload: res.data,
          });
          setLoading(false);
        });
    }
  };
};

export const PostRegistHandler = (formdata) => {
  console.log("여기?");

  return async (dispatch: Dispatch<PostAction>) => {
    console.log("d여기?");

    await axios
      .post("/api/create_post", formdata, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        dispatch({
          type: ActionType.POST_REGISTRATION,
          payload: res.data,
        });
        console.log(res);
      });
  };
};

export const DeletePostHandler = (postId) => {
  return async (dispatch: Dispatch<PostAction>) => {
    await axios
      .delete(`/api/post_delete/${postId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        dispatch({
          type: ActionType.POST_DELETE,
        });
        console.log(res);
      });
  };
};
