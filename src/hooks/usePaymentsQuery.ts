import { useQuery } from "@tanstack/react-query";
import { fetchPayments, type Payment } from "../api/PaymentApi";

export function useFetchPaymentsQuery(enabled: boolean = true) {
  return useQuery<Payment[], Error>({
    queryKey: ["payment"],
    queryFn: fetchPayments,
    enabled,
  });
}
