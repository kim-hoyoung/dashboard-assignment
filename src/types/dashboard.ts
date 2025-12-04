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

// Top10 가맹점 그래프
export type TopMerchantStat = {
  mchtCode: string; // 가맹점 코드
  mchtName: string; // 가맹점 이름
  totalAmount: number; // 총 거래 금액
  totalCount: number; // 총 거래 건수
};
