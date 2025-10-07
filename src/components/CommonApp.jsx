import { Link, useLocation } from "react-router-dom";

export function CommonApp() {
  const loc = useLocation();

  return (
    <div>
      {/* 네비게이션 바 */}
      <nav className="bg-gray-500 text-white px-6 py-3 shadow-md">
        <ul className="flex justify-center space-x-6 text-3xl">
          <Link path={`${loc}/list`}>글목록</Link>
          <Link path={`${loc}/write`}>글등록</Link>
        </ul>
      </nav>

      {/* 라우터 영역 */}
      <div className="p-6"></div>
    </div>
  );
}
