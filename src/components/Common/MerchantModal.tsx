import { useMerchantModalStore } from "../../store/merchantModalStore";

export default function MerchantModal() {
  const { isOpen, selectedMerchant, closeModal } = useMerchantModalStore();

  if (!isOpen || !selectedMerchant) return null;

  function formatDate(dateString?: string) {
    if (!dateString) return "-";
    return dateString.split("T")[0];
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white w-[400px] rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-bold mb-4">가맹점 상세 정보</h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">코드</span>
            <span className="text-gray-800">{selectedMerchant.mchtCode}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">이름</span>
            <span className="text-gray-800">{selectedMerchant.mchtName}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">업종</span>
            <span className="text-gray-800">{selectedMerchant.bizType}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">사업자 번호</span>
            <span className="text-gray-800">{selectedMerchant.bizNo}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">주소</span>
            <span className="text-gray-800">{selectedMerchant.address}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">핸드폰 번호</span>
            <span className="text-gray-800">{selectedMerchant.phone}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">이메일</span>
            <span className="text-gray-800">{selectedMerchant.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">상태</span>
            <span
              className={
                selectedMerchant.status === "ACTIVE"
                  ? "text-green-600 font-semibold"
                  : "text-red-600 font-semibold"
              }
            >
              {selectedMerchant.status}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">등록일</span>
            <span className="text-gray-800">
              {formatDate(selectedMerchant.registeredAt)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">수정일</span>
            <span className="text-gray-800">
              {formatDate(selectedMerchant.updatedAt)}
            </span>
          </div>
        </div>

        <button
          onClick={closeModal}
          className="mt-6 w-full py-2 bg-blue-600 text-white rounded-lg cursor-pointer"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
