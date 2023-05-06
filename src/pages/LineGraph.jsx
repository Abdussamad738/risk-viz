import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import {render} from 'react-dom';
export default function LineGraph({ filteredData }) {
  const [chart, setChart] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const datasets = [];
    const labels = [];
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b'];

    if (filteredData && filteredData.length > 0) {
      console.log("filtered data from LineGraph"+JSON.stringify(filteredData));
      const years = [...new Set(filteredData.map(d => d.Year))];
      years.sort((a, b) => a - b);
      years.forEach((year, index) => {
        const yearData = filteredData.filter(d => d.Year === year);
        yearData.forEach(d => {
          if (!datasets.find(set => set.label === d['Asset Name'])) {
            datasets.push({
              label: d['Asset Name'],
              data: [],
              backgroundColor: colors[datasets.length],
              borderColor: colors[datasets.length],
              fill: false,
            });
          }
          datasets.find(set => set.label === d['Asset Name']).data[index] = d['Risk Rating'];
        });
        labels.push(year);
      });
      setChartData({ datasets, labels });
    }
  }, [filteredData]);

  useEffect(() => {
    if (!chart && chartData) {
      const ctx = document.getElementById('chart').getContext('2d');
      setChart(new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          scales: {
            xAxes: [{
              type: 'category',
              labels: chartData.labels,
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
                max: 5,
              },
            }],
          },
          tooltips: {
            mode: 'nearest',
            intersect: false,
          },
        },
      }));
    }
  }, [chart, chartData]);

  return (
    <div style={{backgroundColor:'#b9cbd1'}}>
      <canvas id="chart"></canvas>
    </div>
  );
}
