import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function BoardWrite() {
  const navigate = useNavigate();
  const idRef = useRef();
  const nameRef = useRef();
  const subjectRef = useRef();
  const contentRef = useRef();

  const goList = () => {
    navigate("/list");
  };

  const handleInsert = async () => {
    const formData = {
      inputId: idRef.current.value,
      inputName: nameRef.current.value,
      inputSubject: subjectRef.current.value,
      inputContent: contentRef.current.value,
    };

    try {
      const resInsert = await fetch("http://localhost:8080/insert", {
        method: "POST", // 데이터 삽입은 보통 POST 방식으로
        headers: {
          "Content-Type": "application/json", // 데이터 타입을 JSON으로 설정
        },
        body: JSON.stringify(formData), // 데이터를 JSON 형식으로 문자열화
      });

      //navigate("/list");

      const data = await resInsert.json();
      // console.log(data.stus);
      if (data.stus === "fail") {
        alert("등록에 실패했습니다.");
      } else {
        alert("등록 되었습니다.");
        navigate("/list");
      }
    } catch (error) {
      console.error("에러:", error);
    }

    // if(!idRef.current.value) alert("아이디 입력하세요")
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">게시글 등록</h2>

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
