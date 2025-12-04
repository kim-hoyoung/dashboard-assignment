import { useQuery } from "@tanstack/react-query";
import {
  fetchPaymentsStatus,
  fetchMerchantStatus,
  fetchPaymentsTypeCodes,
  type StatusItem,
  type PaymentType,
} from "../api/CommonCodeApi";

//결재 상태 쿼리
export function usePaymentsStatusQuery(enabled: boolean = true) {
  return useQuery<StatusItem[], Error>({
    queryKey: ["payment-status"],
    queryFn: fetchPaymentsStatus,
    enabled,
  });
}

//결재 수단 쿼리
export function usePaymentTypeQuery(enabled: boolean = true) {
  return useQuery<PaymentType[], Error>({
    queryKey: ["payment-type"],
    queryFn: fetchPaymentsTypeCodes,
    enabled,
  });
}

//가맹점 상태 쿼리
export function useMerchantStatusQuery(enabled: boolean = true) {
  return useQuery<StatusItem[], Error>({
    queryKey: ["merchant-status"],
    queryFn: fetchMerchantStatus,
    enabled,
  });
}
