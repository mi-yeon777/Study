import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function RestBoardWrite() {
  const navigate = useNavigate();
  const idRef = useRef();
  const nameRef = useRef();
  const subjectRef = useRef();
  const contentRef = useRef();

  const [fileRows, setFileRows] = useState([]); // [{id:string}, ...]
  const filesFormRef = useRef(null);

  const addFileRow = () => {
    setFileRows((prev) => [...prev, { id: crypto.randomUUID() }]); // 고유 id
  };

  const removeFileRow = (id) => {
    setFileRows((prev) => prev.filter((r) => r.id !== id));
  };

  const handleFileCheck = (e) => {
    const file = e.target.files[0];
    const fileName = file.name.split(".").pop().toLowerCase();
    const allowExt = ["jpg", "png", "gif"];
    const url = window.URL || window.webkitURL;

    if (!allowExt.includes(fileName)) {
      alert("이미지 파일만 가능합니다.");
      e.target.value = "";
    } else {
      //사이즈 체크
      const img = new Image();
      img.src = url.createObjectURL(file);

      img.onload = () => {
        if (img.width > 200 || img.height > 200) {
          alert("사이즈는 200px X 200px 이하만");
          e.target.value = "";
        }
      };
    }
  };

  const goList = () => {
    navigate("/rest/list");
  };

  const handleInsert = async () => {
    // const formData = {
    //   userId: idRef.current.value,
    //   userName: nameRef.current.value,
    //   boardSubject: subjectRef.current.value,
    //   boardContent: contentRef.current.value,
    // };

    const formData = new FormData();
    formData.append("userId", idRef.current.value);
    formData.append("userName", nameRef.current.value);
    formData.append("boardSubject", subjectRef.current.value);
    formData.append("boardContent", contentRef.current.value);

    const inputs = filesFormRef.current.querySelectorAll('input[name="files"]');
    inputs.forEach((inp) => {
      if (inp.files && inp.files[0]) formData.append("files", inp.files[0]); //스프링: RestBoardController클래스에서
    });

    //localhost:8080/board?name=111&id=test11(queryString)
    try {
      const res = await fetch(`http://localhost:8080/board`, {
        //GET, HEAD - body : 파라마터 전송 X
        method: "POST", // 데이터 삽입은 보통 POST 방식으로
        body: formData,

        //multipart/form-data

        // headers: {
        //   "Content-Type": "application/json", // 데이터 타입을 JSON으로 설정
        // },
        // body: JSON.stringify(formData), // 데이터를 JSON 형식으로 문자열화
      });

      //navigate("/list");

      const data = await res.json();
      // console.log(data.stus);
      if (data.status === "fail") {
        alert("등록에 실패했습니다.");
      } else {
        alert("등록 되었습니다.");
        navigate("/rest/list");
      }
    } catch (error) {
      console.error("에러:", error);
    }

    // if(!idRef.current.value) alert("아이디 입력하세요")
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">REST 등록</h2>

      <div className="space-y-4">
        <div className="flex items-center">
          <label className="w-20 font-medium">이름 :</label>
          <input
            type="text"
            ref={nameRef}
            className="flex-1 border border-gray-400 px-3 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div className="flex items-center">
          <label className="w-20 font-medium">아이디 :</label>
          <input
            type="text"
            ref={idRef}
            className="flex-1 border border-gray-400 px-3 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div className="flex items-center">
          <label className="w-20 font-medium">제목 :</label>
          <input
            type="text"
            ref={subjectRef}
            className="flex-1 border border-gray-400 px-3 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div className="flex items-start">
          <label className="w-20 font-medium mt-2">내용 :</label>
          <textarea
            rows="6"
            ref={contentRef}
            className="flex-1 border border-gray-400 px-3 py-2 focus:outline-none focus:border-blue-600 resize-none"
          />
        </div>
      </div>

      <form ref={filesFormRef} className="mt-4 flex flex-col items-start">
        <button
          type="button"
          onClick={addFileRow}
          className="bg-orange-500 text-white px-4 py-1 rounded mb-2"
        >
          파일추가
        </button>

        <div className="w-full space-y-2">
          {fileRows.map((row) => (
            <div key={row.id} className="flex items-center gap-2">
              <input
                type="file"
                onChange={handleFileCheck}
                name="files"
                className="block"
              />
              <button
                type="button"
                onClick={() => removeFileRow(row.id)}
                className="text-red-600 border border-red-400 rounded px-2 py-1 text-sm hover:bg-red-50"
                aria-label="파일 줄 삭제"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      </form>

      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={handleInsert}
          className="bg-blue-600 text-white px-5 py-2 border border-blue-600 hover:bg-blue-700"
        >
          등록
        </button>
        <button
          onClick={goList}
          className="bg-green-500 text-white px-5 py-2 hover:bg-green-600"
        >
          목록으로
        </button>
      </div>
    </div>
  );
}
