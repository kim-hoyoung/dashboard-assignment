import { useMemo } from "react";
import { useFetchPaymentsQuery } from "../hooks/usePaymentsQuery";
import type { Payment } from "../api/PaymentApi";
import type { MonthlyPaymentStats } from "../types/dashboard";

export function useMonthlyPaymentsStats(enabled: boolean = true) {
  const paymentsQuery = useFetchPaymentsQuery(enabled);

  const { data: payments = [], isLoading, error } = paymentsQuery;

  const monthlyStats: MonthlyPaymentStats[] = useMemo(() => {
    if (!payments || payments.length === 0) return [];

    // 연도 기준은 올해만
    const now = new Date();
    const currentYear = now.getFullYear();

    const map = new Map<
      string,
      { totalAmount: number; totalCount: number; monthIndex: number }
    >();

    payments.forEach((p: Payment) => {
      const date = new Date(p.paymentAt);
      if (Number.isNaN(date.getTime())) return;

      const year = date.getFullYear();
      if (year !== currentYear) return; // 올해 것만 집계

      const monthIndex = date.getMonth(); // 0 ~ 11
      const key = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;

      const amountNum = Number(p.amount);
      const safeAmount = Number.isNaN(amountNum) ? 0 : amountNum;

      const prev = map.get(key) ?? {
        totalAmount: 0,
        totalCount: 0,
        monthIndex,
      };
      map.set(key, {
        totalAmount: prev.totalAmount + safeAmount,
        totalCount: prev.totalCount + 1,
        monthIndex,
      });
    });

    // Map → 배열로 변환 + 월 순서대로 정렬
    const result: MonthlyPaymentStats[] = Array.from(map.entries())
      .map(([key, value]) => ({
        key,
        label: `${value.monthIndex + 1}월`,
        totalAmount: value.totalAmount,
        totalCount: value.totalCount,
      }))
      .sort((a, b) => a.key.localeCompare(b.key));

    return result;
  }, [payments]);

  return {
    monthlyStats,
    isLoading,
    errorMessage: (error as Error | undefined)?.message,
  };
}
