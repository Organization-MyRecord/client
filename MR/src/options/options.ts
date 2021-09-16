type Options = {
  //select options의 타입 지정
  value: string;
  label: string;
};

export const options: Options[] = [
  { value: "IT/웹/통신", label: "IT-웹-통신" },
  { value: "건설", label: "건설" },
  { value: "경영/행정", label: "경영-행정" },
  { value: "경찰/소방", label: "경찰-소방" },
  { value: "교육", label: "교육" },
  { value: "미디어/디자인", label: "미디어-디자인" },
  { value: "법률", label: "법률" },
  { value: "사회복지", label: "사회복지" },
  { value: "서비스업", label: "서비스업" },
  { value: "식품/가공/생산", label: "식품-가공-생산" },
  { value: "유통/무역/운송", label: "유통-무역-운송" },
  { value: "은행/금융", label: "은행-금융" },
  { value: "의료/제약/복지", label: "의료-제약-복지" },
  { value: "인문/사회과학", label: "인문-사회과학" },
  { value: "자연/생명과학", label: "자연-생명과학" },
  { value: "전기/전자", label: "전기-전자" },
  { value: "화학", label: "화학" },
];

export const Major: Options[] = [
  { value: "인문", label: "인문" },
  { value: "사회", label: "사회" },
  { value: "교육", label: "교육" },
  { value: "공학", label: "공학" },
  { value: "자역", label: "자역" },
  { value: "의약", label: "의약" },
  { value: "예체능", label: "예체능" },
];

export const lim_Specialc = /[^가-힣ㄱ-ㅎㅏ-ㅣ0-9a-zA-Z~!*?:;.,\s]/gi; //특수문자 제한
export const lim_num = /[^0-9]/gi; //숫자만 허용
export const lim_al = /[^a-z]/gi; //영문만 허용
export const lim_kor = /[a-z0-9]|[ \]{}()<>?|`~!@#$%^&*-_+=,.;:'\\]/g; //한글만 허용
export const lim_email = /^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/; //이메일 정규식

export const formats = [
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
