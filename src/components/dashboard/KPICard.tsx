import { type KPICardProps } from "@_types/dashboard";

export default function KPICard({
  totalMerchants,
  totalPayments,
  totalAmount,
  todayNewMerchants,
  todayAmount,
  todayPayments,
  isLoading,
  errorMessage,
}: KPICardProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col w-full px-4 py-4 gap-7 ">
        <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-lg shadow-2xs h-40 p-4 sm:text-left text-center flex items-center justify-center">
          <span className="text-sm text-gray-600">로딩 중...</span>
        </div>
      </div>
    );
  }
  if (errorMessage) {
    return (
      <div className="flex flex-col w-full px-4 py-4 gap-7 ">
        <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-lg shadow-2xs h-40 p-4 sm:text-left text-center flex items-center justify-center">
          <span className="text-sm text-red-500">에러: {errorMessage}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full px-4 py-4 gap-7 ">
      <div
        className="bg-linear-to-br from-[#EFF6FF] to-[#FAF5FF] 
                   rounded-lg  shadow-2xs h-40 p-4 text-center"
      >
        <div className="flex flex-col gap-4 text-[#555] font-medium">
          {/* 위 */}
          <div className="flex justify-between p-6 bg-white shadow-[0_0_4px_rgba(0,0,0,0.1)] rounded-lg w-full h-14">
            <div className="flex-1 flex flex-col items-center justify-center">
              <span className="text-sm ">전체 가맹점 수</span>
              <span className="text-lg font-bold text-gray-800">
                {totalMerchants.toLocaleString()}
              </span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
              <span className="text-sm">전체 거래 건 수</span>
              <span className="text-lg font-bold text-gray-800">
                {totalPayments.toLocaleString()}
              </span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
              <span className="text-sm">총 거래 금액</span>
              <span className="text-lg font-bold text-gray-800">
                {totalAmount.toLocaleString()}원
              </span>
            </div>
          </div>
          {/* 아래 */}
          <div className="flex justify-between p-6 bg-white shadow-[0_0_4px_rgba(0,0,0,0.1)] rounded-lg w-full h-14">
            <div className="flex-1 flex flex-col items-center justify-center">
              <span className="text-sm">오늘 추가된 가맹점</span>
              <span className="text-lg font-bold text-gray-800">
                {todayNewMerchants.toLocaleString()}
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
              <span className="text-sm">오늘 거래 건 수</span>
              <span className="text-lg font-bold text-gray-800">
                {todayPayments.toLocaleString()}
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
              <span className="text-sm">오늘 거래 금액</span>
              <span className="text-lg font-bold text-gray-800">
                {todayAmount.toLocaleString()}원
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
