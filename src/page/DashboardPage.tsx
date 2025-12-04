import KPICard from "@_components/dashboard/KPICard";
import MonthlyPaymentChart from "@_components/dashboard/MonthlyPaymentChart";
import TopMerchantChart from "@_components/dashboard/TopMerchantChart";
import { useFetchMerchantsDetailQuery } from "@_hooks/useMerchantsQuery";
import { useFetchPaymentsQuery } from "@_hooks/usePaymentsQuery";

export default function DashboardPage() {
  // api 호출
  const merchantsQuery = useFetchMerchantsDetailQuery(true);
  const paymentQuery = useFetchPaymentsQuery(true);

  //로딩 에러
  const isLoading = merchantsQuery.isLoading || paymentQuery.isLoading;
  const errorMessage =
    merchantsQuery.error?.message || paymentQuery.error?.message;

  const merchants = merchantsQuery.data ?? [];
  const payments = paymentQuery.data ?? [];

  // 오늘 날짜 계산
  const today = new Date().toISOString().slice(0, 10);
  // 총 가맹점 수, 총 거래 수
  const totalMerchants = merchants.length;
  const totalPayments = payments.length;

  // 총 거래 금액
  const totalAmount = payments.reduce((sum, p) => {
    const amount = Number(p.amount);
    return Number.isNaN(amount) ? sum : sum + amount;
  }, 0);

  // 오늘 추가된 가맹점
  const todayNewMerchants = merchants.filter((m) =>
    m.registeredAt?.startsWith(today)
  ).length;

  // 오늘 거래 건 수
  const todayPayments = payments.filter((p) =>
    p.paymentAt.startsWith(today)
  ).length;

  // 오늘 거래 금액
  const todayAmount = payments.reduce((sum, p) => {
    if (p.paymentAt?.startsWith(today)) {
      const amount = Number(p.amount);
      return Number.isNaN(amount) ? sum : sum + amount;
    }
    return sum;
  }, 0);

  return (
    <div>
      <KPICard
        totalMerchants={totalMerchants}
        totalPayments={totalPayments}
        totalAmount={totalAmount}
        todayNewMerchants={todayNewMerchants}
        todayPayments={todayPayments}
        todayAmount={todayAmount}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
      <MonthlyPaymentChart />
      <TopMerchantChart />
    </div>
  );
}
