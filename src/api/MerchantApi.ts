import ApiClient from "./ApiClient";
import { type ApiResponse } from "./types";

// 가맹점 목록 공통 정보
export interface MerchantsItem {
  mchtCode: string;
  mchtName: string;
  status: string;
  bizType: string;
}

// 가맹점 상세 정보
export interface MerchantsDetails extends MerchantsItem {
  bizNo: string;
  address: string;
  phone: string;
  email: string;
  registeredAt: string;
  updatedAt: string;
}
//-------------------------------------------------------------

// 가맹점 목록 조회
export async function fetchMerchants(): Promise<MerchantsItem[]> {
  const res = await ApiClient.get<ApiResponse<MerchantsItem[]>>(
    "/api/v1/merchants/list"
  );
  return res.data.data;
}

// 가맹점 상세 조회
export async function fetchMerchantsDetail(): Promise<MerchantsDetails[]> {
  const res = await ApiClient.get<ApiResponse<MerchantsDetails[]>>(
    "/api/v1/merchants/details"
  );
  return res.data.data;
}

// 특정 코드로 가맹점 조회
export async function fetchMerchantsCode(
  mchtCode: string
): Promise<MerchantsDetails> {
  const res = await ApiClient.get<ApiResponse<MerchantsDetails>>(
    `/api/v1/merchants/details/${mchtCode}`
  );
  return res.data.data;
}
