import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function DefaultLayout() {
  return (
    // 사이드바
    <div className="w-full h-screen flex">
      <aside className="w-64">
        <Sidebar />
      </aside>

      {/* 헤더 영역 */}
      <div className="w-full">
        <header className="w-full">
          <Header />
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
