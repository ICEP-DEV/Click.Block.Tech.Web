import React, { useState, useEffect } from 'react';
import './graph_styles.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { BASE_URL } from '../API/API';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const PanicButtonFeature = () => {
  // State to manage line chart data
  const [lineData, setLineData] = useState({
    labels: [], // Initialize with empty labels
    datasets: [
      {
        label: 'Panic Button Usage',
        data: [],
        fill: false,
        borderColor: '#ffffff',
        backgroundColor: '#02457A',
        tension: 0.3,
        pointBackgroundColor: '#ffffff',
        pointBorderWidth: 2,
      },
    ],
  });

  // Fetch and process data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/alertPinLogs`);
        const data = await response.json();

        // Process data to calculate counts per month
        const countsPerMonth = {};

        data.forEach((log) => {
          const date = new Date(log.date);
          const month = date.toLocaleString('default', { month: 'short' }); // e.g., 'Jan'
          if (!countsPerMonth[month]) {
            countsPerMonth[month] = 0;
          }
          countsPerMonth[month] += log.count;
        });

        // Prepare labels and counts arrays in order
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const labels = [];
        const counts = [];

        months.forEach((month) => {
          labels.push(month);
          counts.push(countsPerMonth[month] || 0);
        });

        // Update the lineData with new labels and counts
        setLineData({
          labels: labels,
          datasets: [
            {
              label: 'Panic Button Usage',
              data: counts,
              fill: false,
              borderColor: '#ffffff',
              backgroundColor: '#02457A',
              tension: 0.3,
              pointBackgroundColor: '#ffffff',
              pointBorderWidth: 2,
            },
          ],
        });
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
    elements: {
      line: {
        tension: 0.3,
        borderWidth: 2,
      },
      point: {
        radius: 3,
        hitRadius: 10,
      },
    },
    scales: {
      x: {
        ticks: { color: '#ffffff' },
        grid: { display: false },
      },
      y: {
        ticks: { color: '#ffffff', stepSize: 2 },
        beginAtZero: true,
        grid: { color: 'rgba(255, 255, 255, 0.2)' },
      },
    },
  };

  return (
    <div className="graphs-panic-feature-section">
      <div className="graphs-line-chart">
        <h2 className="graphs-section-heading">Panic Alerts Usage</h2>
        <Line data={lineData} options={lineOptions} />
      </div>
    </div>
  );
};

export default PanicButtonFeature;
