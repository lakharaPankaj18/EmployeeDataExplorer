import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalaryChart = () => {
  const location = useLocation();
  const employeeData = location.state?.employeeData || [];

  // Show loading if no data
  if (!employeeData || employeeData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading employee data...</p>
      </div>
    );
  }

  // Take only the first 10 employees
  const firstTenEmployees = employeeData.slice(0, 10);

  // Prepare chart data
  const chartData = useMemo(() => {
    const labels = firstTenEmployees.map((emp) => emp.name || "Unknown");
    const salaries = firstTenEmployees.map((emp) =>
      parseFloat(String(emp.salary || 0).replace(/[$,]/g, ""))
    );

    return {
      labels,
      datasets: [
        {
          label: "Employee Salary (USD)",
          data: salaries,
          backgroundColor: "rgba(79, 70, 229, 0.7)",
          borderColor: "rgba(79, 70, 229, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, [firstTenEmployees]);

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top", labels: { font: { size: 14 } } },
      title: {
        display: true,
        text: "Top 10 Employees Salary Comparison",
        font: { size: 18, weight: "bold" },
        padding: { top: 10, bottom: 30 },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || "";
            if (label) label += ": ";
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Employee Name",
          font: { weight: "bold" },
        },
      },
      y: {
        title: {
          display: true,
          text: "Salary (USD)",
          font: { weight: "bold" },
        },
        beginAtZero: true,
        ticks: {
          callback: (value) =>
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }).format(value),
        },
      },
    },
  };

  // Render the chart
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="container mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">
          Salary Distribution Analysis
        </h1>

        <div className="relative h-[500px] w-full">
          <Bar options={options} data={chartData} />
        </div>

        <p className="mt-8 text-center text-slate-500">
          Data shows the comparison of salaries for the top ten employees in the
          directory.
        </p>
      </div>
    </div>
  );
};

export default SalaryChart;
