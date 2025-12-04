import ApiClient from "./ApiClient";
import { type ApiResponse } from "./types";

// 결제 한 건 데이터
export interface Payment {
  paymentCode: string;
  mchtCode: string;
  amount: string;
  currency: string;
  payType: string;
  status: string;
  paymentAt: string;
}
//-------------------------------------------------------------

// 결제 리스트 조회
export async function fetchPayments(): Promise<Payment[]> {
  const res = await ApiClient.get<ApiResponse<Payment[]>>(
    "/api/v1/payments/list"
  );
  return res.data.data;
}
