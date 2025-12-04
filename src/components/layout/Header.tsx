import { useLocation } from "react-router-dom";

const TITLE: Record<string, string> = {
  "/": "대시보드",
  "/merchantlist": "가맹점 정보",
  "/paymentlist": "거래내역 리스트",
};

export default function Header() {
  const location = useLocation();
  const title = TITLE[location.pathname] ?? "TITLE";
  const name = "김호영";

  return (
    <div className="w-full">
      <div className="flex justify-between p-3 px-8 text-left font-medium text-gray-800 ">
        <h1>{title}</h1>
        <h1>
          관리자 : <span className="text-blue-600 font-semibold">{name}</span>
        </h1>
      </div>

      <hr className="w-full border-[#919191] border" />
    </div>
  );
}
