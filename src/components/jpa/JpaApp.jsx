import { Link, Outlet } from "react-router-dom";

export function JpaApp() {
  return (
    <div>
      {/* 네비게이션 바 */}
      <nav className="bg-blue-400 text-white px-6 py-3 shadow-md">
        <ul className="flex justify-center space-x-6 text-3xl">
          <li>
            <Link
              to="/jpa/list"
              className="hover:text-yellow-400 font-semibold transition-colors"
            >
              글목록
            </Link>
          </li>
          <li>
            <Link
              to="/jpa/write"
              className="hover:text-yellow-400 font-semibold transition-colors"
            >
              글등록
            </Link>
          </li>
        </ul>
      </nav>

      {/* 라우터 영역 */}
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}
