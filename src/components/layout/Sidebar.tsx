import { useLocation, useNavigate } from "react-router-dom";

type MenuItem = {
  label: string;
  route: string;
};

const menuItems: MenuItem[] = [
  { label: "대시보드", route: "/" },
  { label: "가맹점 정보", route: "/merchantlist" },
  { label: "거래내역 리스트", route: "paymentlist" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (route: string) => {
    navigate(`/${route}`);
  };

  const isActive = (route: string) => {
    return location.pathname === `/${route}`;
  };

  // 기본 버튼
  const baseItemClass =
    "relative w-full rounded-lg bg-white py-2.5 text-center text-5 text-[#878787] shadow-md transition-colors duration-300 cursor-pointer hover:bg-[#2579F8] hover:text-white";
  // 엑티브 버튼
  const activeItemClass = "bg-[#2579F8] text-white font-bold text-5";

  return (
    <aside
      className="
        z-1000
        flex h-screen w-56 flex-col items-center
        bg-white p-5
        shadow-[0_2px_10px_rgba(0,0,0,0.1)]
        transition-[width] duration-300 ease-in-out
        md:w-64
      "
    >
      {/* 메뉴 + 홈 버튼 컨테이너 */}
      <div className="flex h-[80%] w-full flex-col justify-between mt-20">
        {/* 메뉴 리스트 */}
        <div className="flex flex-col gap-4">
          {menuItems.map((item) => {
            const active = isActive(item.route);
            return (
              <button
                key={item.route}
                type="button"
                className={`${baseItemClass} ${active ? activeItemClass : ""}`}
                onClick={() => navigateTo(item.route)}
              >
                {active && (
                  <span
                    className="
                      absolute left-2 top-1/2
                      h-[22px] w-[7px]
                      -translate-y-1/2
                      rounded-full bg-neutral-100
                    "
                  />
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* 로그아웃 버튼 */}
        <div className="mb-5">
          <button
            type="button"
            className="
              w-full rounded-lg
              bg-[#535353] px-3 py-2.5
              text-5 text-white
              shadow-md shadow-neutral-300
              transition-colors duration-300
              hover:bg-neutral-900
              cursor-pointer
            "
          >
            로그아웃
          </button>
        </div>
      </div>
    </aside>
  );
}
