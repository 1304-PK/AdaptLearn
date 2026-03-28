import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

const SpiderGraph = ({ data = {}, color = "#a78bfa" }) => {
  const labels = Object.keys(data).map((k) => k.replace(/_/g, " "));
  const values = Object.values(data);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: `${color}30`,
        borderColor: color,
        borderWidth: 2,
        pointBackgroundColor: color,
        pointBorderColor: "#000",
        pointBorderWidth: 1.5,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        min: 0,
        max: 1,
        ticks: {
          stepSize: 0.2,
          color: "rgba(255,255,255,0.3)",
          backdropColor: "transparent",
          font: { size: 9 },
        },
        grid: { color: "rgba(255,255,255,0.1)" },
        angleLines: { color: "rgba(255,255,255,0.15)" },
        pointLabels: {
          color: "rgba(255,255,255,0.8)",
          font: { size: 11, weight: "500" },
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.raw}`,
        },
      },
    },
  };

  return (
    <div className="flex items-center justify-center bg-black rounded-2xl p-6">
      <div className="w-full max-w-sm">
        <Radar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SpiderGraph;


// --- Usage ---
// import SpiderGraph from "./SpiderGraph";
//
// const data = {
//   Frontend_Core: 1,
//   Performance_Architecture: 0.75,
//   API_State_Management: 1,
//   Tooling_Quality: 1,
//   Leadership_Soft_Skills: 0.5,
// };
//
// <SpiderGraph data={data} />
// <SpiderGraph data={data} color="#34d399" />