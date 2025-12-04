import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useMonthlyPaymentsStats } from "@_hooks/useMonthlyPaymentsStats";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const LABELS = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

export default function MonthlyPaymentChart() {
  const { monthlyStats, isLoading, errorMessage } =
    useMonthlyPaymentsStats(true);
  if (isLoading) {
    return (
      <div className="w-full p-4">
        <div className="bg-white rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.1)] p-4 text-sm text-gray-600">
          월간 거래 그래프 로딩 중...
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="w-full p-4">
        <div className="bg-white rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.1)] p-4 text-sm text-red-500">
          에러: {errorMessage}
        </div>
      </div>
    );
  }

  if (monthlyStats.length === 0) {
    return (
      <div className="w-full p-4">
        <div className="bg-white rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.1)] p-4 text-sm text-gray-500">
          월간 거래 데이터가 없습니다.
        </div>
      </div>
    );
  }

  const statsByLabel = new Map(monthlyStats.map((m) => [m.label, m]));

  const labels = LABELS;

  const amountData = labels.map((label) => {
    const stat = statsByLabel.get(label);
    return stat ? stat.totalAmount : 0;
  });

  const countData = labels.map((label) => {
    const stat = statsByLabel.get(label);
    return stat ? stat.totalCount : 0;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "월별 총 거래 금액",
        data: amountData,
        yAxisID: "y",
        borderColor: "rgba(59, 130, 246, 1)", // 파란색
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        pointBackgroundColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 5,
        fill: false,
      },
      {
        label: "월별 거래 건수",
        data: countData,
        yAxisID: "y1",
        borderColor: "rgba(168, 85, 247, 1)", // 보라색
        backgroundColor: "rgba(168, 85, 247, 0.3)",
        pointBackgroundColor: "rgba(168, 85, 247, 1)",
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 5,
        fill: false,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false as const, // 부모 높이에 맞게
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (ctx: any) {
            const label = ctx.dataset.label || "";
            const value = ctx.raw;
            if (label.includes("금액")) {
              return `${label}: ${Number(value).toLocaleString()}원`;
            }
            return `${label}: ${Number(value).toLocaleString()}건`;
          },
        },
      },
    },
    // 금액
    scales: {
      y: {
        beginAtZero: true,
        position: "left" as const,
        ticks: {
          stepSize: 1_000_000,
          callback: (value: any) => {
            const million = Number(value) / 1_000_000;
            return `${million.toLocaleString()}백만 원`;
          },
        },
      },

      // 건 수
      y1: {
        beginAtZero: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          stepSize: 10,
          callback: (value: any) => `${Number(value).toLocaleString()}건`,
        },
      },
    },
  };
  return (
    <div className="w-full p-4">
      <div className="bg-white rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.1)] p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          월간 거래 추이
        </h2>
        <div className="relative h-72 max-h-72">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
