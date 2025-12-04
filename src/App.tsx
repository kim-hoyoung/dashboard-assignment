import "./App.css";
import "./index.css";
import { useState } from "react";
import { usePaymentsStatusQuery } from "./hooks/useCommonQuery";
import { useFetchPaymentsQuery } from "./hooks/usePaymentsQuery";
import { useMerchantsQuery } from "./hooks/useMerchantsQuery";

type LastApiName = "payments" | "merchants" | "common" | "";

function App() {
  const [lastApiName, setLastApiName] = useState<LastApiName>("");

  // 🔹 여기에서 state 변수(lastApiName)를 사용해야 함
  const paymentsQuery = useFetchPaymentsQuery(lastApiName === "payments");
  const merchantsQuery = useMerchantsQuery(lastApiName === "merchants");
  const paymentStatusQuery = usePaymentsStatusQuery(lastApiName === "common");

  // 🔹 현재 선택된 카드에 따라 보여줄 상태 정리
  let loading = false;
  let errorMessage = "";
  let rawData: any = null;

  if (lastApiName === "payments") {
    loading = paymentsQuery.isLoading;
    errorMessage = paymentsQuery.error?.message ?? "";
    rawData = paymentsQuery.data;
  } else if (lastApiName === "merchants") {
    loading = merchantsQuery.isLoading;
    errorMessage = merchantsQuery.error?.message ?? "";
    rawData = merchantsQuery.data;
  } else if (lastApiName === "common") {
    loading = paymentStatusQuery.isLoading;
    errorMessage = paymentStatusQuery.error?.message ?? "";
    rawData = paymentStatusQuery.data;
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen gap-10 bg-slate-900 text-white">
        {/* 버튼 3개 */}
        <div className="flex justify-center items-center gap-20">
          <button
            onClick={() => setLastApiName("payments")}
            className="border border-blue-500 rounded-2xl text-center p-3 px-6 hover:bg-blue-500/10 transition"
          >
            <div>거래 내역 전체 조회</div>
            <div className="text-xs text-gray-300 mt-1">
              /api/v1/payments/list
            </div>
          </button>

          <button
            onClick={() => setLastApiName("merchants")}
            className="border border-blue-500 rounded-2xl text-center p-3 px-6 hover:bg-blue-500/10 transition"
          >
            <div>가맹점 정보</div>
            <div className="text-xs text-gray-300 mt-1">
              /api/v1/merchants/list
            </div>
          </button>

          <button
            onClick={() => setLastApiName("common")}
            className="border border-blue-500 rounded-2xl text-center p-3 px-6 hover:bg-blue-500/10 transition"
          >
            <div>공통 코드</div>
            <div className="text-xs text-gray-300 mt-1">
              /api/v1/common/payment-status/all
            </div>
          </button>
        </div>

        <div className="w-full max-w-4xl px-4">
          {lastApiName && (
            <div className="mb-2 text-sm text-gray-300">
              마지막 호출: <span className="font-semibold">{lastApiName}</span>
            </div>
          )}

          {loading && (
            <div className="text-sm text-blue-300">불러오는 중...</div>
          )}

          {errorMessage && (
            <div className="text-sm text-red-400">에러: {errorMessage}</div>
          )}

          {rawData && !loading && !errorMessage && (
            <pre className="mt-2 bg-black/60 text-green-300 text-xs p-4 rounded-xl overflow-x-auto max-h-96">
              {JSON.stringify(rawData, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
