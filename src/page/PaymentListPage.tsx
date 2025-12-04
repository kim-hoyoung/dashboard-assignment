import { useMemo, useState } from "react";
import { useFetchPaymentsQuery } from "@_hooks/usePaymentsQuery";
import type { Payment } from "@_api/PaymentApi";

const PAGE_SIZE = 10;

export default function PaymentListPage() {
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 전체 결제 목록 조회
  const { data, isLoading, error } = useFetchPaymentsQuery(true);

  // 검색어로 1차 필터링 (가맹점 코드 기준)
  const filteredPayments = useMemo(() => {
    // API 응답이 없을 수도 있으니 안전하게 처리
    const payments: Payment[] = data ?? [];

    if (!searchName.trim()) return payments;

    const keyword = searchName.trim().toLowerCase();
    return payments.filter(
      (p) =>
        p.paymentCode.toLowerCase().includes(keyword) ||
        p.mchtCode.toLowerCase().includes(keyword)
    );
  }, [data, searchName]);

  // 페이지네이션용 2차 슬라이싱
  const totalPages =
    filteredPayments.length === 0
      ? 1
      : Math.ceil(filteredPayments.length / PAGE_SIZE);

  const pagedPayments = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filteredPayments.slice(start, end);
  }, [filteredPayments, currentPage]);

  // 검색어가 바뀌면 페이지를 1로 초기화
  const handleChangeSearch = (value: string) => {
    setSearchName(value);
    setCurrentPage(1);
  };

  // 날짜만 표시하는 함수
  function formatDate(dateString?: string) {
    if (!dateString) return "-";
    return dateString.split("T")[0];
  }
  // 금액 표시 함수
  function formatAmount(amount: string | number) {
    const num =
      typeof amount === "number" ? amount : Number(amount.replace(/,/g, ""));

    if (Number.isNaN(num)) return String(amount); // 숫자로 못 바꾸면 원본 그대로

    return num.toLocaleString("ko-KR");
  }

  if (isLoading) {
    return (
      <div className="w-full px-4 py-4">
        <div className="bg-white rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.1)] p-4 text-sm text-gray-600">
          가맹점 정보 로딩 중...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-4 py-4">
        <div className="bg-white rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.1)] p-4 text-sm text-red-500">
          가맹점 정보를 불러오는 중 오류가 발생했습니다: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-6">
      {/* 제목 */}
      <h1 className="mb-4 text-lg font-semibold text-gray-800">결제 내역</h1>

      {/* 검색바 */}
      <div className="mb-4">
        <div className="w-full h-10 flex items-center rounded-full border border-gray-200 bg-white px-4 shadow-[0_0_4px_rgba(0,0,0,0.05)]">
          <span className="mr-2 text-sm text-gray-400">🔍</span>
          <input
            type="text"
            value={searchName}
            onChange={(e) => handleChangeSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setCurrentPage(1)}
            placeholder="결제 코드 또는 가맹점 이름 입력"
            className="w-full text-sm outline-none bg-transparent"
          />
        </div>
      </div>

      {/* 테이블 */}
      <div className="bg-white rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.1)] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 text-center text-gray-500">순번</th>
              <th className="py-3 px-2 text-center text-gray-500">
                가맹점 코드
              </th>
              <th className="py-3 px-4 text-center text-gray-500">결제 번호</th>
              <th className="py-3 px-4 text-center text-gray-500">결제금액</th>
              <th className="py-3 px-4 text-center text-gray-500">결제수단</th>
              <th className="py-3 px-4 text-center text-gray-500">결제일시</th>
              <th className="py-3 px-4 text-center text-gray-500">결제상태</th>
            </tr>
          </thead>
          <tbody>
            {pagedPayments.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 px-4 text-center text-gray-400">
                  표시할 결제 내역이 없습니다.
                </td>
              </tr>
            ) : (
              pagedPayments.map((payment, index) => (
                <tr
                  key={payment.paymentCode}
                  className="border-b last:border-b-0 border-gray-100"
                >
                  <td className="py-3 px-4 text-center text-gray-700">
                    {(currentPage - 1) * PAGE_SIZE + (index + 1)}
                  </td>
                  <td className="py-3 px-2 text-center text-gray-700">
                    {payment.mchtCode}
                  </td>
                  <td className="py-3 px-2 text-center text-gray-800">
                    {payment.paymentCode}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-700">
                    {formatAmount(payment.amount) + " 원"}
                  </td>
                  <td className="py-3 px-2 text-center text-gray-700">
                    {payment.payType}
                  </td>
                  <td
                    className={
                      payment.status === "SUCCESS"
                        ? "text-green-600 py-3 px-2 text-center"
                        : "text-red-600 py-3 px-2 text-center"
                    }
                  >
                    {payment.status}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-700">
                    {formatDate(payment.paymentAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-full border border-gray-200 disabled:opacity-40 cursor-pointer"
        >
          Previous
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-full border border-gray-200 disabled:opacity-40 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
