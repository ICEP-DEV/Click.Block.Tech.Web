import React from 'react';
import './graph_styles.css';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const PanicButtonFeature = ({ monthlyPieData, selectedMonthYear, setSelectedMonthYear }) => {
  // Line data for Panic Button Usage
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Panic Button Usage',
        data: [0, 1, 3, 7, 2, 6, 8, 1, 6, 4, 2, 0],
        fill: false,
        borderColor: '#ffffff',
        backgroundColor: '#02457A',
        tension: 0.3,
        pointBackgroundColor: '#ffffff',
        pointBorderWidth: 2
      }
    ]
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: { color: '#ffffff' },
        grid: { display: false }
      },
      y: {
        ticks: { color: '#ffffff', stepSize: 2 },
        beginAtZero: true,
        max: 10,
        grid: { color: 'rgba(255, 255, 255, 0.2)' }
      }
    }
  };

  // Doughnut data for Weekly Usage
  const doughnutData = {
    labels: ['Week 1', 'Week 2', 'Week 3'],
    datasets: [
      {
        label: 'Weekly Usage',
        data: [0, 45, 55],
        backgroundColor: ['#00407A', '#02599B', '#0491D4'],
        hoverOffset: 4,
        borderWidth: 0
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      }
    },
    cutout: '70%',
  };

  return (
    <div className="graphs-panic-feature-section">
      <div className="graphs-line-chart">
        <h2 className="graphs-section-heading">Panic Button Usage</h2>
        <Line data={lineData} options={lineOptions} />
      </div>

      <div className="graphs-doughnut-chart">
        <h2 className="graphs-section-heading">Weekly Usage</h2>
        <Doughnut data={doughnutData} options={doughnutOptions} />
        <div className="graphs-month-year-filter">
          <select id="month-year" value={selectedMonthYear} onChange={(e) => setSelectedMonthYear(e.target.value)}>
            {Object.keys(monthlyPieData).map((monthYear) => (
              <option key={monthYear} value={monthYear}>{monthYear}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default PanicButtonFeature;
