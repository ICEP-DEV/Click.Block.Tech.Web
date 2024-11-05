import React from 'react';
import './style.css';
import { Line, Pie } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const PanicButtonFeature = ({ monthlyPieData, selectedMonthYear, setSelectedMonthYear }) => {
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Panic Button Usage',
        data: [5, 12, 8, 14, 18, 11, 9, 13, 17, 10, 7, 15],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1
      }
    ]
  };

  const pieData = {
    labels: ['Resolved', 'Pending', 'False Alarms'],
    datasets: [
      {
        label: 'Panic Button Responses',
        data: monthlyPieData[selectedMonthYear],
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
        hoverOffset: 4
      }
    ]
  };

  return (
    <div className="panic-feature-section">
      <h2 className="section-heading">Panic Button Feature Usage</h2>
      <div className="charts-container">
        <div className="line-chart"><Line data={lineData} options={{ responsive: true }} /></div>
        <div className="pie-chart">
          <Pie data={pieData} options={{ responsive: true }} />
          <div className="month-year-filter">
            <label htmlFor="month-year">Filter by Month and Year:</label>
            <select id="month-year" value={selectedMonthYear} onChange={(e) => setSelectedMonthYear(e.target.value)}>
              {Object.keys(monthlyPieData).map((monthYear) => (
                <option key={monthYear} value={monthYear}>{monthYear}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanicButtonFeature;
