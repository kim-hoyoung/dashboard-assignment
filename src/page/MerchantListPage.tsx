import { useMemo, useState } from "react";
import { useFetchMerchantsDetailQuery } from "../hooks/useMerchantsQuery";
import { fetchMerchantsCode, type MerchantsDetails } from "../api/MerchantApi";
import { useMerchantModalStore } from "../store/merchantModalStore";

const PAGE_SIZE = 10;

export default function MerchanListPage() {
  const [searchCode, setSearchCode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // zustand 모달 store
  const openModal = useMerchantModalStore((state) => state.openModal);

  // 전체 가맹점 상세 목록 조회
  const { data, isLoading, error } = useFetchMerchantsDetailQuery(true);

  // API 응답이 없을 수도 있으니 안전하게 처리
  const merchants: MerchantsDetails[] = data ?? [];

  // 검색어로 1차 필터링 (가맹점 코드 기준)
  const filteredMerchants = useMemo(() => {
    if (!searchCode.trim()) return merchants;

    const keyword = searchCode.trim().toLowerCase();
    return merchants.filter((m) => m.mchtCode.toLowerCase().includes(keyword));
  }, [merchants, searchCode]);

  // 페이지네이션용 2차 슬라이싱
  const totalPages =
    filteredMerchants.length === 0
      ? 1
      : Math.ceil(filteredMerchants.length / PAGE_SIZE);

  const pagedMerchants = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filteredMerchants.slice(start, end);
  }, [filteredMerchants, currentPage]);

  // 검색어가 바뀌면 페이지를 1로 초기화
  const handleChangeSearch = (value: string) => {
    setSearchCode(value);
    setCurrentPage(1);
  };

  // 날짜만 표시하는 함수
  function formatDate(dateString?: string) {
    if (!dateString) return "-";
    return dateString.split("T")[0];
  }

  // 특정 코드로 상세 조회 -> 모달 오픈
  async function handleSearchSubmit() {
    if (!searchCode.trim()) return;

    try {
      const result = await fetchMerchantsCode(searchCode.trim());
      openModal(result);
    } catch {
      alert("해당 가맹점 코드를 찾을 수 없습ㅂ니다.");
    }
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
      <h1 className="mb-4 text-lg font-semibold text-gray-800">가맹점 정보</h1>

      {/* 검색바 */}
      <div className="mb-4">
        <div className="w-full h-10 flex items-center rounded-full border border-gray-200 bg-white px-4 shadow-[0_0_4px_rgba(0,0,0,0.05)]">
          <span className="mr-2 text-sm text-gray-400">🔍</span>
          <input
            type="text"
            value={searchCode}
            onChange={(e) => handleChangeSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
            placeholder="가맹점 코드 입력"
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
              <th className="py-3 px-4 text-center text-gray-500">가맹점명</th>
              <th className="py-3 px-4 text-center text-gray-500">업종</th>
              <th className="py-3 px-4 text-center text-gray-500">주소</th>
              <th className="py-3 px-4 text-center text-gray-500">상태</th>
              <th className="py-3 px-4 text-center text-gray-500">등록일</th>
              <th className="py-3 px-4 text-center text-gray-500">
                최종 수정일
              </th>
            </tr>
          </thead>
          <tbody>
            {pagedMerchants.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 px-4 text-center text-gray-400">
                  표시할 가맹점이 없습니다.
                </td>
              </tr>
            ) : (
              pagedMerchants.map((merchant, index) => (
                <tr
                  key={merchant.mchtCode}
                  className="border-b last:border-b-0 border-gray-100"
                >
                  <td className="py-3 px-4 text-center text-gray-700">
                    {(currentPage - 1) * PAGE_SIZE + (index + 1)}
                  </td>
                  <td className="py-3 px-2 text-center text-gray-700">
                    {merchant.mchtCode}
                  </td>
                  <td className="py-3 px-2 text-center text-gray-800">
                    {merchant.mchtName}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-700">
                    {merchant.bizType}
                  </td>
                  <td className="py-3 px-2 text-center text-gray-700">
                    {merchant.address}
                  </td>
                  <td
                    className={
                      merchant.status === "ACTIVE"
                        ? "text-green-600 py-3 px-2 text-center"
                        : "text-red-600 py-3 px-2 text-center"
                    }
                  >
                    {merchant.status}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-700">
                    {formatDate(merchant.registeredAt)}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-700">
                    {formatDate(merchant.updatedAt)}
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
