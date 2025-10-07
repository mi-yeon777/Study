import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function RestBoardDetail() {
  const navigate = useNavigate();
  const idRef = useRef();
  const nameRef = useRef();
  const subjectRef = useRef();
  const contentRef = useRef();
  const { num } = useParams();
  const [detailData, setDetailData] = useState({});
  const [isMode, setIsMode] = useState(false);
  const [files, setFiles] = useState([]);

  const goList = () => {
    navigate("/rest/list");
  };

  useEffect(() => {
    const detail = async () => {
      const res = await fetch(`http://localhost:8080/board/${num}`);
      const data = await res.json();
      setDetailData(data.boardDto);
      setFiles(data.listFile);
    };

    detail();
  }, [num]);

  const handleDownload = async (file) => {
    const formData = {
      realName: file.realName,
      saveName: file.saveName,
      savePath: file.savePath,
    };

    const res = await fetch("http://localhost:8080/board/fileDownload", {
      method: "POST", // 데이터 삽입은 보통 POST 방식으로
      headers: {
        "Content-Type": "application/json", // 데이터 타입을 JSON으로 설정
      },
      body: JSON.stringify(formData), // 데이터를 JSON 형식으로 문자열화
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.realName || "download"; // 서버의 real_name 사용
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  const changeMode = () => {
    setIsMode(true);
  };

  const cancleMode = () => {
    setIsMode(false);
  };

  const handleUpdate = async () => {
    const formData = {
      boardNum: num,
      inputId: idRef.current.value,
      inputName: nameRef.current.value,
      inputSubject: subjectRef.current.value,
      inputContent: contentRef.current.value,
    };

    try {
      const res = await fetch("http://localhost:8080/board", {
        method: "PUT", // 데이터 삽입은 보통 POST 방식으로
        headers: {
          "Content-Type": "application/json", // 데이터 타입을 JSON으로 설정
        },
        body: JSON.stringify(formData), // 데이터를 JSON 형식으로 문자열화
      });
      const data = await res.json();
      if (data.stus === "fail") {
        alert("수정에 실패했습니다.");
      } else {
        alert("수정되었습니다.");
        navigate("/rest/list");
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const handleDelete = async () => {
    if (confirm("삭제하시겠습니까?")) {
      const res = await fetch(`http://localhost:8080/delete/${num}`);
      const data = await res.json();

      if (data.stus === "fail") {
        alert("삭제 처리가 실패하였습니다.");
      } else {
        alert("삭제되었습니다.");
        navigate("/rest/list");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div>{JSON.stringify(detailData)}</div>
      <h2 className="text-2xl font-bold mb-6 text-center">게시글 등록</h2>

      <div className="space-y-4">
        <div className="flex items-center">
          <label className="w-20 font-medium">이름 :</label>
          {!isMode ? (
            <span className="flex-1 px-3 py-2 text-left">
              {detailData.userName}
            </span>
          ) : (
            <input
              type="text"
              ref={nameRef}
              defaultValue={detailData.userName}
              className="flex-1 border border-gray-400 px-3 py-2 focus:outline-none focus:border-blue-600"
            />
          )}
        </div>

        <div className="flex items-center">
          <label className="w-20 font-medium">아이디 :</label>
          {!isMode ? (
            <span className="flex-1 px-3 py-2 text-left">
              {detailData.userId}
            </span>
          ) : (
            <input
              type="text"
              ref={idRef}
              defaultValue={detailData.userId}
              className="flex-1 border border-gray-400 px-3 py-2 focus:outline-none focus:border-blue-600"
            />
          )}
        </div>

        <div className="flex items-center">
          <label className="w-20 font-medium">제목 :</label>
          {!isMode ? (
            <span className="flex-1 px-3 py-2 text-left">
              {detailData.boardSubject}
            </span>
          ) : (
            <input
              type="text"
              ref={subjectRef}
              defaultValue={detailData.boardSubject}
              className="flex-1 border border-gray-400 px-3 py-2 focus:outline-none focus:border-blue-600"
            />
          )}
        </div>

        <div className="flex items-start">
          <label className="w-20 font-medium mt-2">내용 :</label>
          {!isMode ? (
            <span className="flex-1 px-3 py-2 text-left">
              {detailData.boardContent}
            </span>
          ) : (
            <textarea
              rows="6"
              ref={contentRef}
              defaultValue={detailData.boardContent}
              className="flex-1 border border-gray-400 px-3 py-2 focus:outline-none focus:border-blue-600 resize-none"
            />
          )}
        </div>
      </div>

      <div className="text-left mt-3">
        <p>첨부파일</p>
        {files &&
          files.map((file, i) => (
            <p
              key={i}
              onClick={() => handleDownload(file)}
              className="text-blue-400 cursor-pointer hover:text-blue-600"
            >
              {file.realName}
            </p>
          ))}
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        {!isMode ? (
          <>
            <button
              onClick={changeMode}
              className="bg-blue-600 text-white px-5 py-2 border border-blue-600 hover:bg-blue-700"
            >
              수정하기
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-5 py-2 border border-blue-600 hover:bg-blue-700"
            >
              삭제
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-5 py-2 border border-blue-600 hover:bg-blue-700"
            >
              수정
            </button>
            <button
              onClick={cancleMode}
              className="bg-red-600 text-white px-5 py-2 border border-blue-600 hover:bg-blue-700"
            >
              취소
            </button>
          </>
        )}
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
