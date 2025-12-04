import { useMemo } from "react";
import { useFetchPaymentsQuery } from "./usePaymentsQuery";
import { useMerchantsQuery } from "./useMerchantsQuery";
import type { Payment } from "../api/PaymentApi";
import type { MerchantsItem } from "../api/MerchantApi";
import type { TopMerchantStat } from "../types/dashboard";

export function useTopMerchantsStats(enabled: boolean = true) {
  // 결제 리스트 가져오기
  const paymentsQuery = useFetchPaymentsQuery(enabled);

  // 가맹점 리스트 가져오기
  const merchantsQuery = useMerchantsQuery(enabled);

  const isLoading = paymentsQuery.isLoading || merchantsQuery.isLoading;

  const errorMessage =
    paymentsQuery.error?.message ?? merchantsQuery.error?.message ?? "";

  const topMerchants: TopMerchantStat[] = useMemo(() => {
    const payments = paymentsQuery.data ?? [];
    const merchants = merchantsQuery.data ?? [];

    if (!payments.length || !merchants.length) return [];

    // 가맹점 코드 → 이름 매핑
    const merchantNameMap = new Map<string, string>();
    merchants.forEach((m: MerchantsItem) => {
      merchantNameMap.set(m.mchtCode, m.mchtName);
    });

    // 가맹점 코드별 합산 (금액 + 건수)
    const aggMap = new Map<
      string,
      { totalAmount: number; totalCount: number }
    >();

    payments.forEach((p: Payment) => {
      const amountNum = Number(p.amount);
      const safeAmount = Number.isNaN(amountNum) ? 0 : amountNum;

      const prev = aggMap.get(p.mchtCode) ?? { totalAmount: 0, totalCount: 0 };

      aggMap.set(p.mchtCode, {
        totalAmount: prev.totalAmount + safeAmount,
        totalCount: prev.totalCount + 1,
      });
    });

    // Map → 배열로 변환 + 이름 매핑
    const stats: TopMerchantStat[] = Array.from(aggMap.entries()).map(
      ([mchtCode, value]) => ({
        mchtCode,
        mchtName: merchantNameMap.get(mchtCode) ?? mchtCode, // 이름 없으면 코드로 fallback
        totalAmount: value.totalAmount,
        totalCount: value.totalCount,
      })
    );

    // 금액 기준 내림차순 정렬 후 Top 10만
    return stats.sort((a, b) => b.totalAmount - a.totalAmount).slice(0, 10);
  }, [paymentsQuery.data, merchantsQuery.data]);

  return {
    topMerchants,
    isLoading,
    errorMessage,
  };
}
