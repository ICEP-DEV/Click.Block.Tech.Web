import React, { useState, useEffect } from 'react';
import './graph_styles.css';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const PanicButtonFeature = ({ monthlyPieData, selectedMonthYear, setSelectedMonthYear }) => {
  // State to manage line chart data
  const [lineData, setLineData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Panic Button Usage',
        data: Array(12).fill(0), // Initially set to zeros
        fill: false,
        borderColor: '#ffffff',
        backgroundColor: '#02457A',
        tension: 0.3,
        pointBackgroundColor: '#ffffff',
        pointBorderWidth: 2
      }
    ]
  });

  // Fetch and process data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.23.248:5000/api/allCustomers/logs');
        const data = await response.json();

        // Calculate counts per month
        const counts = Array(12).fill(0);
        data.forEach((log) => {
          const monthIndex = new Date(`${log.year}-${log.month}-01`).getMonth();
          counts[monthIndex] += log.count;
        });

        // Update the lineData with new counts
        setLineData((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: counts
            }
          ]
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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

  // Doughnut chart data and options remain the same
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
          label: function (context) {
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
        <h2 className="graphs-section-heading">Panic Alerts Usage</h2>
        <Line data={lineData} options={lineOptions} />
      </div>

      {/* <div className="graphs-doughnut-chart">
        <h2 className="graphs-section-heading">Weekly Usage</h2>
        <Doughnut data={doughnutData} options={doughnutOptions} />
        <div className="graphs-month-year-filter">
          <select id="month-year" value={selectedMonthYear} onChange={(e) => setSelectedMonthYear(e.target.value)}>
            {Object.keys(monthlyPieData).map((monthYear) => (
              <option key={monthYear} value={monthYear}>{monthYear}</option>
            ))}
          </select>
        </div>
      </div> */}
    </div>
  );
};

export default PanicButtonFeature;
