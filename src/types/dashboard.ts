// 대쉬보드 KPI 타입

export type KPICardProps = {
  totalMerchants: number;
  totalPayments: number;
  totalAmount: number;

  todayNewMerchants: number;
  todayPayments: number;
  todayAmount: number;

  isLoading?: boolean;
  errorMessage?: string;
};

// 월간 거래 그래프

export type MonthlyPaymentStats = {
  key: string; // 정렬 기준
  label: string; // 달 수
  totalAmount: number; // 월 거래 총액
  totalCount: number; // 월 거래 건수
};
