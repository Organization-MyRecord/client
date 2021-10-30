# _My Record_

> ### **React와 TypeScript를 이용한 취준생들의 기술스택을 전문적으로 정리하기 위한 블로그**

 <br/>

![logo](https://user-images.githubusercontent.com/68778883/139292377-573b3eb4-b7d7-409a-bff1-06187adc5789.png)

<br/>

# 목차

1. [개요](#개요)
2. [실행영상](#실행영상)
   - [메인페이지](#메인페이지)
   - [로그인](#로그인)
   - [글쓰기](#글쓰기)
   - [댓글남기기](#댓글남기기)
3. [프로젝트 특징](#프로젝트-특징)
4. [사용 패키지](#사용-패키지)
5. [폴더구조](#폴더구조)
6. [주요기능](#주요-기능)
7. [트러블슈팅](#트러블-슈팅)
8. [후기](#후기)

<br/>

# 개요

- **명칭** : My Record
- **개발인원** : 3명
  - Front-End : 김정수
  - Back-End : 정지광
  - Web-Publisher : 이휘은
- **개발기간** : 2021.07.29 ~ 2021.10.29 (~현재는 리팩토링중 . . .)
- **주요기능**
  - 이메일 인증을 통한 로그인 및 회원가입
  - React-Quill을 사용한 CRUD
  - 댓글과 대댓글 기능
- **개발언어** : TypeScript
- **개발 라이브러리** : React.js
- **형상관리 툴** : Git
- **협업 툴** : Trello, Swagger

<br/>

# 실행영상

## 메인페이지

![메인페이지](https://user-images.githubusercontent.com/68778883/139527562-b2522212-d5c4-41ac-80d5-b86fcb690115.gif)

<br/>

## 로그인

![로그인 기능](https://user-images.githubusercontent.com/68778883/139527742-6a0a5bd2-404f-4766-8b91-bf4c26fe9453.gif)

<br/>

## 글쓰기

![포스팅 기능](https://user-images.githubusercontent.com/68778883/139527786-bec41dcd-7fe4-4932-97eb-08f395e24a83.gif)

<br/>

## 댓글남기기

![댓글 남기기](https://user-images.githubusercontent.com/68778883/139527784-3976da9b-06f2-4f1a-8d6b-7a00e3aa6fd5.gif)

<br/>

## 개인정보 수정

![개인정보 수정](https://user-images.githubusercontent.com/68778883/139527783-0540a508-2309-4d7e-9b08-79132620b95e.gif)

# 프로젝트 특징

1. ### My Record(마이레코드)

   - 각 전공의 취준생들의 기술스택 적립을 위한 블로그
   - 개발자만을 위한 기술 블로그인 [velog](https://velog.io/)와는 다르게 다양한 분야의 전공자들이 사용 가능
   - 각 공통된 분야를 쉽게 볼 수 있도록 카테고리별로 분류
   - 직관적이고 한눈에 볼 수 있는 디자인

     <br/>

2. ### 프론트엔드와 백엔드를 분리하여 개발

   - 각 파트별로 Repository를 생성 후 작업
   - 프론트: AWS S3, Cloud Front
   - 백엔드: AWS EC2
   - 빌드 후, S3와 EC2를 연동

   <br/>

3. ### 사용자의 관심도에 따른 게시물 표시
   - 인기글을 가상 상단에 표시
   - 로그인 시에는 자신의 최근 글 4개를 상단으로
   - 화면 하단부에는 전체 글 중 최신글들을 표시

<br/>

4. ### 전공의 다양성 및 세분화를 통한 동일 직업군간의 접근성 상승
   - 직업군 별로 카테고리를 나눔(회원가입 탭에서 자동으로)
   - 왼쪽 카테고리 클릭 시 해당 직업군 관련 글이 리스트로 보여짐

<br/>

# 사용 패키지

- **Redux/React-Redux**
  - 데이터 전역 관리를 위한 리덕스 패키지
- **Axios**
  - 서버통신을 위한 패키지
- **Scss**
  - 컴포넌트 스타일링 하는 패키지
- **React-Loader-Spinner**
  - 페이지 로딩화면을 구현하는 패키지
- **React-Quill**
  - 게시판 입력용 커스텀 패키지
- **React-Icons**
  - 아이콘 사용용 패키지
- **React-Modal**

  - 모달창 구현을 위한 패키지

    <br/>

# 폴더구조

```javascript
├─MR
│  │  README.md
│  │  package.json
│  ├─public
│  │  ├─Images
│  │  │  ├─jpgs...
│  │  │  ├─//이하 중략
│  │  │ index.html
│  │  │ //이하 중략
│  │  └ manifest.json
│  └─src
│     ├─components
│     │  ├─Category //카테고리부분
│     │  ├─Change //개인정보수정관련
│     │  ├─user //유저정보 관련
│     │  └ Post //포스팅 관련
│     ├─styles
│     ├─modules
│     │  ├─action-creater //액션생성함수 관련
│     │  ├─action-type  //액션타입
│     │  └ action //액션 인터페이스 지정
│     ├─options
│     ├─App.tsx
│     └ index.tsx
```

<br/>

# 주요 기능

# 트러블 슈팅

# 후기
