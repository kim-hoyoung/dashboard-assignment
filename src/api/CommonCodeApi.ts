import ApiClient from "./ApiClient";
import { type ApiResponse } from "./types";

// 결제 상태, 가맹점 상태
export interface StatusItem {
  code: string;
  description: string;
}

// 결제 수단
export interface PaymentType {
  type: string;
  description: string;
}
//-------------------------------------------------------------

// 결제 상태 조회
export async function fetchPaymentsStatus(): Promise<StatusItem[]> {
  const res = await ApiClient.get<ApiResponse<StatusItem[]>>(
    "/api/v1/common/payment-status/all"
  );
  return res.data.data;
}

// 결제 수단 조회
export async function fetchPaymentsTypeCodes(): Promise<PaymentType[]> {
  const res = await ApiClient.get<ApiResponse<PaymentType[]>>(
    "/api/v1/common/paymemt-type/all"
  );
  return res.data.data;
}

// 가맹점 상태 조회
export async function fetchMerchantStatus(): Promise<StatusItem[]> {
  const res = await ApiClient.get<ApiResponse<StatusItem[]>>(
    "/api/v1/common/mcht-status/all"
  );
  return res.data.data;
}
