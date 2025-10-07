import { Link, NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import { Boardlist } from "./components/legacy/BoardList";
import { BoardWrite } from "./components/legacy/BoardWrite";
import { Login } from "./components/legacy/Login";
import { BoardDetail } from "./components/legacy/BoardDetail";
import { RestBoardList } from "./components/rest/RestBoardList";
import { RestBoardWrite } from "./components/rest/RestBoardWrite";
import { RestBoardDetail } from "./components/rest/RestBoardDetail";
import { LegacyApp } from "./components/legacy/LegacyApp";
import { RestApp } from "./components/rest/RestApp";
import { JpaApp } from "./components/jpa/JpaApp";
import { JpaBoardList } from "./components/jpa/JpaBoardList";
import { JpaBoardWrite } from "./components/jpa/JpaBoardWrite";
import { JpaBoardDetail } from "./components/jpa/JpaBoardDetail";

function App() {
  return (
    <div>
      {/* 네비게이션 바 */}
      <div className="bg-gray-500 text-white px-6 py-3 shadow-md">
        <ul className="flex justify-center space-x-6 text-3xl">
          <li>
            <NavLink
              to="/legacy"
              className={({ isActive }) =>
                `hover:text-yellow-400 font-semibold transition-colors ${
                  isActive && "text-red-400"
                }`
              }
            >
              legacy
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/rest"
              className={({ isActive }) =>
                `hover:text-yellow-400 font-semibold transition-colors ${
                  isActive && "text-green-400"
                }`
              }
            >
              rest
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/jpa"
              className={({ isActive }) =>
                `hover:text-yellow-400 font-semibold transition-colors ${
                  isActive && "text-blue-400"
                }`
              }
            >
              jpa
            </NavLink>
          </li>
        </ul>
      </div>

      {/* 라우터 영역 */}
      <div className="p-6">
        <Routes>
          <Route path="/legacy" element={<LegacyApp />}>
            <Route path="list" element={<Boardlist />}></Route>
            <Route path="write" element={<BoardWrite />}></Route>
            <Route path="detail/:num" element={<BoardDetail />}></Route>
          </Route>
          <Route path="/rest" element={<RestApp />}>
            <Route path="list" element={<RestBoardList />}></Route>
            <Route path="write" element={<RestBoardWrite />}></Route>
            <Route path="detail/:num" element={<RestBoardDetail />}></Route>
          </Route>
          <Route path="/jpa" element={<JpaApp />}>
            <Route path="list" element={<JpaBoardList />}></Route>
            <Route path="write" element={<JpaBoardWrite />}></Route>
            <Route path="detail/:num" element={<JpaBoardDetail />}></Route>
          </Route>

          <Route path="*" element={<div>Not found 404</div>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
