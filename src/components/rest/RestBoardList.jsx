import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function RestBoardList() {
  const navigate = useNavigate();
  const [board, setBoard] = useState([]);
  const [page, setPage] = useState({});
  const [pageBlock, setPageBlock] = useState([]);
  const searchTypeRef = useRef();
  const searchTxtRef = useRef();
  const stDateRef = useRef();
  const endDateRef = useRef();

  useEffect(() => {
    const boardList = async () => {
      const res = await fetch("http://localhost:8080/board");
      const data = await res.json();
      //resdto( list<boarddto> list, pagedto page)
      setBoard(data.list);
      pageSetting(data.page);
    };

    boardList();
  }, []);

  const handleDetail = (num) => {
    navigate(`/rest/detail/${num}`);
  };

  const handleSearch = async (page) => {
    const stDate = stDateRef.current.value;
    const endDate = endDateRef.current.value;

    const formData = {
      searchType: searchTypeRef.current.value,
      searchTxt: searchTxtRef.current.value,
      stDate: stDate,
      endDate: endDate,
      curPage: page,
      pageSize: 5,
    };

    if ((stDate && !endDate) || (!stDate && endDate)) {
      alert("시작일 종료일 모두 입력하세요");
      return;
    } else {
      const res = await fetch("http://localhost:8080/board/search", {
        //GET, HEAD - body : 파라마터 전송 X
        method: "POST", // 데이터 삽입은 보통 POST 방식으로
        headers: {
          "Content-Type": "application/json", // 데이터 타입을 JSON으로 설정
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setBoard(data.list);
      pageSetting(data.page);
    }
  };

  const pageSetting = (page) => {
    setPage(page);

    const arr = [];
    for (let p = page.blockStart; p <= page.blockEnd; p++) arr.push(p);
    setPageBlock(arr);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">REST 목록</h2>

      <table className="min-w-full border-collapse border border-gray-300 shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border border-gray-300 px-4 py-2">글번호</th>
            <th className="border border-gray-300 px-4 py-2">이름(아이디)</th>
            <th className="border border-gray-300 px-4 py-2">제목</th>
            <th className="border border-gray-300 px-4 py-2">작성일</th>
            <th className="border border-gray-300 px-4 py-2">수정일</th>
            <th className="border border-gray-300 px-4 py-2">조회수</th>
          </tr>
        </thead>
        <tbody>
          {board.length === 0 ? (
            <tr className="hover:bg-gray-200 text-center cursor-pointer">
              <td colSpan={6} className="border border-gray-300 px-4 py-2">
                조회된 데이터가 없습니다.
              </td>
            </tr>
          ) : (
            board.map((data) => (
              <tr
                key={data.boardNum}
                onClick={() => handleDetail(data.boardNum)}
                className="hover:bg-gray-200 text-center cursor-pointer"
              >
                <td className="border border-gray-300 px-4 py-2">
                  {data.boardNum}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-left">
                  {data.userName}({data.userId})
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {data.boardSubject}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {data.regDate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {data.uptDate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {data.viewCnt}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div>page :: {JSON.stringify(page)}</div>
      <div className="flex justify-center gap-3">
        {page.blockStart !== 1 && (
          <span
            onClick={() => handleSearch(page.blockStart - 1)}
            className="border border-gray-200 px-2 py-1 cursor-pointer"
          >
            이전
          </span>
        )}

        {pageBlock.map((p) => (
          <span
            key={p}
            onClick={() => handleSearch(p)}
            className="border border-gray-400 px-1 py-1"
          >
            {p}
          </span>
        ))}

        {page.blockEnd < page.totalPages && (
          <span
            onClick={() => handleSearch(page.blockEnd + 1)}
            className="border border-gray-200 px-2 py-1 cursor-pointer"
          >
            다음
          </span>
        )}
      </div>

      <div className="space-y-3 mt-10">
        {/* 검색 조건 */}

        <div className="flex justify-center items-center gap-2">
          <select
            ref={searchTypeRef}
            className="border border-gray-400 rounded px-2 py-2 focus:outline-none focus:border-blue-600"
          >
            <option value="all">전 체</option>
            <option value="name">작성자</option>
            <option value="subject">제목</option>
            <option value="subCont">제목+내용</option>
          </select>

          <input
            type="text"
            ref={searchTxtRef}
            placeholder="검색어 입력"
            className="flex border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-600"
          />

          <button
            onClick={() => handleSearch(1)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            검색
          </button>
        </div>

        {/* 날짜 검색 */}
        <div className="flex justify-center items-center gap-2">
          <input
            type="date"
            ref={stDateRef}
            placeholder="시작일"
            className="w-40 border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-600"
          />
          <span>~</span>
          <input
            type="date"
            ref={endDateRef}
            placeholder="종료일"
            className="w-40 border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>
      </div>
    </div>
  );
}
