import React, { useRef, useMemo, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "../styles/post.scss";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { PostRegistHandler } from "../modules/action-creator/PostIndex";

function Post() {
  const dispatch = useDispatch();

  //Content 내부에서 사진 이미지 리사이징을 위한 모듈
  Quill.register("modules/ImageResize", ImageResize);
  const QuillRef = useRef<ReactQuill>();
  const [Title, setTitle] = useState(""); // 제목을 저장할 state
  const [contents, setcontents] = useState(""); //내용을 저장할 state
  const [directoryName, setdirectoryName] = useState("IT/웹통신");

  let url: string;
  // 이미지를 업로드 하기 위한 함수
  const imageHandler = () => {
    // 파일을 업로드 하기 위한 input 태그 생성
    const input = document.createElement("input");
    const formData = new FormData();

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (input.files) {
        const file: any = input.files[0];

        formData.append("file", file);

        try {
          axios
            .post("/api/upload", formData, {
              headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            })
            .then((res) => {
              url = res.data;
              sessionStorage.setItem("url", url);

              // 커서의 위치를 알고 해당 위치에 이미지 태그를 넣어주는 코드
              // 해당 DOM의 데이터가 필요하기에 useRef를 사용한다.
              const range = QuillRef.current?.getEditor().getSelection()?.index;
              if (range !== null && range !== undefined) {
                const quill = QuillRef.current?.getEditor();

                quill?.setSelection(range, 1);

                quill?.clipboard.dangerouslyPasteHTML(
                  range,
                  `<img src=${url} alt="이미지 태그가 삽입됩니다." style = {{overflow : "hidden"}}/>`,
                );
              }

              return { ...res, url };
            });
        } catch (error) {
          const err = error as AxiosError;
          return { ...err.response };
        }
      }
    };
  };
  const titleHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setTitle(e.currentTarget.value);
  };

  //게시글 등록
  const PostHandler = () => {
    const url = sessionStorage.getItem("url");
    console.log(url);

    dispatch(PostRegistHandler(Title, contents, directoryName, url));
    localStorage.removeItem("url");
  };

  const DirectoryNameHander = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setdirectoryName(e.currentTarget.value);
  };

  const modules = useMemo(
    () => ({
      ImageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize"],
      },
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }, { align: [] }],
          ["image", "video", "link"],
          ["clean"],
          ["code-block"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  );

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "size",
    "small",
    "large",
    "huge",
    "color",
    "list",
    "ordered",
    "bullet",
    "indent",
    "align",
    "image",
    "video",
    "link",
    "clean",
    "code-block",
  ];

  return (
    <div className="post">
      <div className="post_header">
        <div className="division">
          <select onChange={DirectoryNameHander}>
            <option value={directoryName} disabled selected hidden>
              카테고리
            </option>
          </select>
          <div className="button_container">
            <button className="modify" onClick={PostHandler}>
              등록
            </button>
          </div>
        </div>
        <textarea placeholder="제목을 입력하세요" value={Title} onChange={titleHandler}></textarea>
        <h6>2021.08.23</h6>
      </div>
      <div className="post_content">
        <ReactQuill
          ref={(element) => {
            if (element !== null) {
              QuillRef.current = element;
            }
          }}
          style={{ height: "650px" }}
          value={contents || ""}
          onChange={setcontents}
          modules={modules}
          formats={formats}
          theme="snow"
          placeholder="내용을 입력해주세요"
        />
      </div>
      <div className="post_list">
        <ul>
          <li>글1</li>
          <li>글2</li>
          <li>글3</li>
        </ul>
      </div>
    </div>
  );
}

export default Post;
