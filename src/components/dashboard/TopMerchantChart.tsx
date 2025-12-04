import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useTopMerchantsStats } from "../../hooks/useTopMerchantsStats";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function TopMerchantChart() {
  const { topMerchants, isLoading, errorMessage } = useTopMerchantsStats();

  if (isLoading) {
    return (
      <div className="w-full px-4 py-4">
        <div className="bg-white rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.1)] p-4 text-sm text-gray-600">
          가맹점 Top 10 그래프 로딩 중...
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="w-full px-4 py-4">
        <div className="bg-white rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.1)] p-4 text-sm text-red-500">
          에러: {errorMessage}
        </div>
      </div>
    );
  }

  if (!topMerchants || topMerchants.length === 0) {
    return (
      <div className="w-full px-4 py-4">
        <div className="bg-white rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.1)] p-4 text-sm text-gray-500">
          가맹점 데이터가 없습니다.
        </div>
      </div>
    );
  }

  //금액 기준으로 내림차순 정렬 후 Top10
  const sorted = [...topMerchants].sort(
    (a, b) => b.totalAmount - a.totalAmount
  );
  const top10 = sorted.slice(0, 10);

  const labels = top10.map((m) => m.mchtName); // x축: 가맹점 이름
  const labeCode = top10.map((m) => m.mchtCode); // 밑에 가맹점 코드
  const amounts = top10.map((m) => m.totalAmount); // y축: 금액

  const data = {
    labels,
    datasets: [
      {
        label: "가맹점별 총 거래 금액",
        data: amounts,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.4)",
        hoverBackgroundColor: "rgba(59, 130, 246, 0.7)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false as const,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: function (items: any) {
            const index = items[0].dataIndex;
            const name = labels[index];
            const code = labeCode[index];
            return `${name} (${code})`;
          },
          label: function (ctx: any) {
            const value = ctx.raw;
            return `총 거래 금액: ${Number(value).toLocaleString()}원`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45,
          callback: function (value: any, index: number) {
            const name = labels[index];
            const code = labeCode[index];
            return `${name}`;
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => `${Number(value).toLocaleString()}원`,
        },
      },
    },
  };
  return (
    <div className="w-full px-4 py-4">
      <div className="bg-white rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.1)] p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          가맹점별 Top 10 거래 금액
        </h2>
        <div className="relative h-72 max-h-72">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
