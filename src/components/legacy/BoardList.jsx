import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Boardlist() {
  const navigate = useNavigate();
  const [board, setBoard] = useState([]);
  const [chkNums, setChkNums] = useState([]);

  useEffect(() => {
    const boardList = async () => {
      const res = await fetch("http://localhost:8080/list");
      const data = await res.json();
      setBoard(data);
    };

    boardList();
  }, []);

  const handleDetail = async (num) => {
    const res = await fetch(`http://localhost:8080/viewCnt/${num}`);
    const data = res.json();
    if (data.stus === false) {
      alert("조회수 증가 실패");
    } else {
      navigate(`/detail/${num}`);
    }
  };

  const handleStop = (event) => {
    event.stopPropagation();
  };

  const handleChecked = (num) => {
    const chk = chkNums.includes(num);
    if (!chk) {
      setChkNums((prev) => [...prev, num]);
    } else {
      setChkNums((prev) => prev.filter((id) => id !== num));
    }
  };

  const handleDelete = async () => {
    // const formData = {
    //   nums: chkNums,
    //   // nums : [1, 4, 7]
    // };

    if (confirm("삭제하시겠습니까?")) {
      const res = await fetch("http://localhost:8080/deleteNums", {
        method: "POST", // 데이터 삽입은 보통 POST 방식으로
        headers: {
          "Content-Type": "application/json", // 데이터 타입을 JSON으로 설정
        },
        body: JSON.stringify(chkNums), // 데이터를 JSON 형식으로 문자열화
      });

      const data = await res.json();
      if (data.stus === false) {
        alert("삭제 실패 했습니다.");
      } else {
        alert("삭제되었습니다.");
        setBoard(
          (prev) => prev.filter((data) => !chkNums.includes(data.board_num))
          //data.board_num !== chkNums[index]
        );
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">게시글 목록</h2>
      <div>{JSON.stringify(chkNums)}</div>
      <table className="min-w-full border-collapse border border-gray-300 shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border border-gray-300 px-4 py-2">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-5 py-2 border border-blue-600 hover:bg-blue-700"
              >
                삭제
              </button>
            </th>
            <th className="border border-gray-300 px-4 py-2">글번호</th>
            <th className="border border-gray-300 px-4 py-2">이름(아이디)</th>
            <th className="border border-gray-300 px-4 py-2">제목</th>
            <th className="border border-gray-300 px-4 py-2">작성일</th>
            <th className="border border-gray-300 px-4 py-2">수정일</th>
            <th className="border border-gray-300 px-4 py-2">조회수</th>
          </tr>
        </thead>
        <tbody>
          {board.map((row, index) => (
            <tr
              key={`board-${index}`}
              className="hover:bg-gray-200 text-center cursor-pointer"
              onClick={() => handleDetail(row.board_num)}
            >
              <td
                onClick={handleStop}
                className="border border-gray-300 px-4 py-2"
              >
                <input
                  type="checkbox"
                  checked={chkNums.includes(row.board_num)}
                  onChange={() => handleChecked(row.board_num)}
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.board_num}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-left">
                {row.user_name}({row.user_id})
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.board_subject}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.reg_date}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.upt_date}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.view_cnt}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
