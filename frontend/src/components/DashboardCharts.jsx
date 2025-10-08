// src/components/DashboardCharts.jsx
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardCharts = () => {
  // Hardcoded AI + IoT Decisions
  const aiIoTData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "IoT Alerts",
        data: [12, 19, 15, 22, 18, 25, 30],
        backgroundColor: "rgba(250, 177, 47, 0.8)",
      },
      {
        label: "AI Actions Taken",
        data: [5, 10, 8, 15, 12, 18, 20],
        backgroundColor: "rgba(250, 129, 47, 0.8)",
      },
      {
        label: "Automated Resolutions",
        data: [2, 5, 4, 6, 5, 8, 10],
        backgroundColor: "rgba(221, 3, 3, 0.8)",
      },
    ],
  };

  const aiIoTOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "AI + IoT-Driven Decisions Over Time",
        font: { size: 20 },
        color: "var(--text-color)",
      },
      legend: {
        position: "top",
        labels: { color: "var(--text-color)" },
      },
      tooltip: { mode: "index", intersect: false },
    },
    interaction: { mode: "nearest", axis: "x", intersect: false },
    scales: {
      x: { grid: { display: false }, ticks: { color: "var(--text-color)" } },
      y: { ticks: { color: "var(--text-color)" } },
    },
  };

  // Hardcoded complaints by category (doughnut chart)
  const complaintsData = {
    labels: ["Road", "Drainage", "Lighting", "Garbage", "Water"],
    datasets: [
      {
        label: "Number of Complaints",
        data: [15, 8, 12, 20, 5],
        backgroundColor: [
          "rgba(250, 177, 47, 0.8)", // primary
          "rgba(250, 129, 47, 0.8)", // secondary
          "rgba(221, 3, 3, 0.8)",    // accent
          "rgba(250, 177, 47, 0.5)",
          "rgba(250, 129, 47, 0.5)",
        ],
        borderWidth: 2,
        borderColor: "var(--background-color)",
      },
    ],
  };

  const complaintsOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Website Complaints by Category",
        font: { size: 20 },
        color: "var(--text-color)",
      },
      legend: { position: "right", labels: { color: "var(--text-color)" } },
    },
  };

  // Complaint Resolution Trend
  const resolutionData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    datasets: [
      {
        label: "Resolved",
        data: [5, 8, 12, 18, 22],
        borderColor: "rgba(54, 162, 235, 0.9)",
        backgroundColor: "rgba(54, 162, 235, 0.3)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Pending",
        data: [20, 18, 15, 12, 10],
        borderColor: "rgba(221, 3, 3, 0.9)",
        backgroundColor: "rgba(221, 3, 3, 0.3)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const resolutionOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Complaint Resolution Trend",
        font: { size: 20 },
        color: "var(--text-color)",
      },
      legend: { position: "top", labels: { color: "var(--text-color)" } },
      tooltip: { mode: "index", intersect: false },
    },
    interaction: { mode: "nearest", axis: "x", intersect: false },
    scales: {
      x: { grid: { display: false }, ticks: { color: "var(--text-color)" } },
      y: { ticks: { color: "var(--text-color)" } },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 mt-10">
      {/* AI + IoT Decisions */}
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <Bar data={aiIoTData} options={aiIoTOptions} />
      </div>

      {/* Complaints by Category */}
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <Doughnut data={complaintsData} options={complaintsOptions} />
      </div>

      {/* Complaint Resolution Trend (full width) */}
      <div className="bg-white p-4 rounded-2xl shadow-md md:col-span-2 w-full">
        <Line data={resolutionData} options={resolutionOptions} />
      </div>
    </div>
  );
};

export default DashboardCharts;
