import { useQuery } from "@tanstack/react-query";
import {
  fetchMerchants,
  fetchMerchantsDetail,
  fetchMerchantsCode,
  type MerchantsItem,
  type MerchantsDetails,
} from "../api/MerchantApi";

// 가맹점 목록 조회 쿼리
export function useMerchantsQuery(enabled: boolean = true) {
  return useQuery<MerchantsItem[], Error>({
    queryKey: ["merchants", "list"],
    queryFn: fetchMerchants,
    enabled,
  });
}

// 가맹점 상세 조회 쿼리
export function useFetchMerchantsDetail(enabled: boolean = true) {
  return useQuery<MerchantsDetails[], Error>({
    queryKey: ["merchants", "details"],
    queryFn: fetchMerchantsDetail,
    enabled,
  });
}

// 특정 코드 가맹점 조회 쿼리
export function useFetchMerchantsCode(mchtCode: string | null) {
  return useQuery<MerchantsDetails, Error>({
    queryKey: ["merchants", "detail", mchtCode],
    queryFn: () => fetchMerchantsCode(mchtCode!),
    enabled: !!mchtCode,
  });
}
