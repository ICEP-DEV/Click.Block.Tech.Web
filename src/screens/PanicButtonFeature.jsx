import React, { useState, useEffect } from 'react';
import './graph_styles.css';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { BASE_URL } from '../API/API';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const PanicButtonFeature = () => {
  // State to manage line chart data
  const [lineData, setLineData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Unique Panic Button Users',
        data: Array(12).fill(0), // Initially set to zeros for 12 months
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

        // Initialize counts for each month
        const counts = Array(12).fill(0);

        // Use a map to track unique IDs for each month
        const uniqueIdsPerMonth = Array.from({ length: 12 }, () => new Set());

        // Process the alerts
        data.forEach((alert) => {
          if (alert["date"] && alert["Id Number"]) {
            const date = new Date(`${alert.year}-${alert.date.split(' ')[1]}-01`); // Construct a date using month name
            const monthIndex = date.getMonth(); // Get month index (0-11)

            // Add unique Id Number to the corresponding month's set
            uniqueIdsPerMonth[monthIndex].add(alert["Id Number"]);
          }
        });

        // Calculate unique counts for each month
        uniqueIdsPerMonth.forEach((idSet, monthIndex) => {
          counts[monthIndex] = idSet.size; // Use the size of the set
        });

        console.log('Unique user counts per month:', counts);

        // Update the lineData with new counts
        setLineData((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: counts, // Set the monthly counts
            },
          ],
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Run once when the component mounts

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
        grid: { display: false },
      },
      y: {
        ticks: {
          color: '#ffffff',
          stepSize: 1, // Step size for Y-axis
        },
        beginAtZero: true,
        grid: { color: 'rgba(255, 255, 255, 0.2)' },
      },
    },
  };

  return (
    <div className="graphs-panic-feature-section">
      <div className="graphs-line-chart">
        <h2 className="graphs-section-heading">Panic Alert Usage</h2>
        <Line data={lineData} options={lineOptions} />
      </div>
    </div>
  );
};

export default PanicButtonFeature;
